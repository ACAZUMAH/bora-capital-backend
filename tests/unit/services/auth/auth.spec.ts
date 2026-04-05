import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { Types } from 'mongoose';

// Define mocks with explicit any types
const mockFindOne = jest.fn<any>();
const mockFindByIdAndDelete = jest.fn<any>();
const mockFindByIdAndUpdate = jest.fn<any>();
const mockFindById = jest.fn<any>();
const mockFindOneAndUpdate = jest.fn<any>();
const mockExists = jest.fn<any>();
const mockUserFindByIdAndUpdate = jest.fn<any>();
const mockUserFindById = jest.fn<any>();
const mockGetUserById = jest.fn<any>();
const mockJwtSign = jest.fn<any>();
const mockJwtVerify = jest.fn<any>();
const mockGenerateOtp = jest.fn<any>().mockReturnValue('123456');
const mockHashToken = jest.fn<any>().mockImplementation((token: string) => `hashed-${token}`);

jest.mock('src/models', () => ({
  authModel: {
    findOne: mockFindOne,
    findByIdAndDelete: mockFindByIdAndDelete,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findById: mockFindById,
    findOneAndUpdate: mockFindOneAndUpdate,
    exists: mockExists,
  },
  userModel: {
    findByIdAndUpdate: mockUserFindByIdAndUpdate,
    findById: mockUserFindById,
  },
}));

jest.mock('src/services/users', () => ({
  getUserById: mockGetUserById,
}));

jest.mock('src/common/helpers', () => ({
  generateOtp: mockGenerateOtp,
  hashToken: mockHashToken,
  jwtSign: mockJwtSign,
  jwtVerify: mockJwtVerify,
}));

import {
  createAuth,
  verifyOtpAndSignJwt,
  refreshAccessToken,
} from 'src/services/auth/auth';
import { OtpPurpose } from 'src/common/enums';

describe('Auth Service', () => {
  const mockUserId = new Types.ObjectId();
  const mockAuthId = new Types.ObjectId();
  const mockUser = {
    _id: mockUserId,
    email: 'test@example.com',
    phoneNumber: '+233700000000',
    firstName: 'John',
    lastName: 'Doe',
    refreshToken: 'hashed-valid-refresh-token',
    kycStatus: 'PENDING',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAuth', () => {
    test('should create auth record with 10 minute expiry', async () => {
      mockExists.mockResolvedValue(null);
      mockFindOneAndUpdate.mockResolvedValue({});

      const result = await createAuth({
        userId: mockUserId,
        len: 6,
        otpPurpose: OtpPurpose.SIGNUP,
      });

      expect(result).toBe('123456');
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { userId: mockUserId },
        expect.objectContaining({
          userId: mockUserId,
          otp: '123456',
          otpPurpose: OtpPurpose.SIGNUP,
          attempts: 0,
        }),
        { upsert: true }
      );

      // Verify 10-minute expiry (not 1 hour)
      const callArgs = mockFindOneAndUpdate.mock.calls[0][1] as any;
      const expiresIn = new Date(callArgs.expiresIn).getTime();
      const now = Date.now();
      const tenMinutesMs = 10 * 60 * 1000;
      expect(expiresIn - now).toBeLessThanOrEqual(tenMinutesMs);
      expect(expiresIn - now).toBeGreaterThan(tenMinutesMs - 5000); // within 5s tolerance
    });

    test('should regenerate OTP if it already exists', async () => {
      mockExists.mockResolvedValueOnce(true).mockResolvedValueOnce(null);
      mockGenerateOtp
        .mockReturnValueOnce('111111')
        .mockReturnValueOnce('222222');
      mockFindOneAndUpdate.mockResolvedValue({});

      const result = await createAuth({
        userId: mockUserId,
        len: 6,
        otpPurpose: OtpPurpose.SIGNUP,
      });

      expect(result).toBe('222222');
      expect(mockGenerateOtp).toHaveBeenCalledTimes(2);
    });
  });

  describe('verifyOtpAndSignJwt', () => {
    test('should return user and tokens for valid OTP', async () => {
      const mockAuth = {
        _id: mockAuthId,
        userId: mockUserId,
        otp: '123456',
        expiresIn: new Date(Date.now() + 10 * 60 * 1000),
        attempts: 0,
      };

      mockFindOne.mockResolvedValue(mockAuth);
      mockFindByIdAndDelete.mockResolvedValue(mockAuth);
      mockGetUserById.mockResolvedValue(mockUser);
      mockUserFindByIdAndUpdate.mockResolvedValue(mockUser);
      mockJwtSign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await verifyOtpAndSignJwt('123456');

      expect(result).toEqual({
        user: mockUser,
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });

      // Should use findOne instead of findOneAndDelete (OTP deleted after validation)
      expect(mockFindOne).toHaveBeenCalledWith({ otp: '123456' });
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(mockAuthId);

      // Refresh token should be stored hashed
      expect(mockUserFindByIdAndUpdate).toHaveBeenCalledWith(mockUserId, {
        refreshToken: 'hashed-refresh-token',
      });
      expect(mockHashToken).toHaveBeenCalledWith('refresh-token');
    });

    test('should throw error for invalid OTP (no auth record found)', async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(verifyOtpAndSignJwt('999999')).rejects.toThrow(
        'Invalid OTP'
      );
    });

    test('should throw error and delete record for expired OTP', async () => {
      const mockAuth = {
        _id: mockAuthId,
        userId: mockUserId,
        otp: '123456',
        expiresIn: new Date(Date.now() - 60 * 1000), // expired 1 minute ago
        attempts: 0,
      };

      mockFindOne.mockResolvedValue(mockAuth);

      await expect(verifyOtpAndSignJwt('123456')).rejects.toThrow(
        'OTP expired'
      );
      // Should clean up expired OTP record
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(mockAuthId);
    });
  });

  describe('refreshAccessToken', () => {
    test('should return new access token for valid refresh token', async () => {
      mockJwtVerify.mockReturnValue({ id: mockUserId.toString() });
      mockGetUserById.mockResolvedValue(mockUser);
      mockHashToken.mockReturnValue('hashed-valid-refresh-token');
      mockJwtSign.mockReturnValue('new-access-token');

      const result = await refreshAccessToken('valid-refresh-token');

      expect(result).toEqual({ accessToken: 'new-access-token' });
      expect(mockJwtVerify).toHaveBeenCalledWith(
        'valid-refresh-token',
        'refresh'
      );
      expect(mockGetUserById).toHaveBeenCalledWith(mockUserId.toString());
      // Should hash the incoming token before comparing
      expect(mockHashToken).toHaveBeenCalledWith('valid-refresh-token');
    });

    test('should throw error for invalid refresh token', async () => {
      mockJwtVerify.mockReturnValue(null);

      await expect(refreshAccessToken('invalid-token')).rejects.toThrow(
        'Invalid refresh token'
      );
    });

    test('should throw error for revoked refresh token (hash mismatch)', async () => {
      mockJwtVerify.mockReturnValue({ id: mockUserId.toString() });
      mockGetUserById.mockResolvedValue({
        ...mockUser,
        refreshToken: 'hashed-different-token',
      });
      mockHashToken.mockReturnValue('hashed-old-token');

      await expect(refreshAccessToken('old-token')).rejects.toThrow(
        'Refresh token has been revoked'
      );
    });

    test('should throw error when jwtVerify throws', async () => {
      mockJwtVerify.mockImplementation(() => {
        throw new Error('Token expired');
      });

      await expect(refreshAccessToken('expired-token')).rejects.toThrow();
    });
  });
});
