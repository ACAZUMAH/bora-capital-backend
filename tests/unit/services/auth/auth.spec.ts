import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { Types } from 'mongoose';

// Define mocks with explicit any types
const mockFindOneAndDelete = jest.fn<any>();
const mockFindOneAndUpdate = jest.fn<any>();
const mockExists = jest.fn<any>();
const mockUserFindByIdAndUpdate = jest.fn<any>();
const mockUserFindById = jest.fn<any>();
const mockGetUserById = jest.fn<any>();
const mockJwtSign = jest.fn<any>();
const mockJwtVerify = jest.fn<any>();
const mockGenerateOtp = jest.fn<any>().mockReturnValue('12345');

jest.mock('src/models', () => ({
  authModel: {
    findOneAndDelete: mockFindOneAndDelete,
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
  jwtSign: mockJwtSign,
  jwtVerify: mockJwtVerify,
}));

import {
  verifyOtpAndSignJwt,
  refreshAccessToken,
} from 'src/services/auth/auth';

describe('Auth Service', () => {
  const mockUserId = new Types.ObjectId();
  const mockUser = {
    _id: mockUserId,
    email: 'test@example.com',
    phoneNumber: '+233700000000',
    firstName: 'John',
    lastName: 'Doe',
    refreshToken: 'valid-refresh-token',
    role: 'CLIENT',
    kycStatus: 'PENDING',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyOtpAndSignJwt', () => {
    test('should return user and tokens for valid OTP (no KYC required)', async () => {
      const mockAuth = {
        userId: mockUserId,
        otp: '12345',
        expiresIn: new Date(Date.now() + 60 * 60 * 1000),
      };

      mockFindOneAndDelete.mockResolvedValue(mockAuth);
      mockGetUserById.mockResolvedValue(mockUser);
      mockUserFindByIdAndUpdate.mockResolvedValue(mockUser);
      mockJwtSign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await verifyOtpAndSignJwt('12345');

      expect(result).toEqual({
        user: mockUser,
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      expect(mockFindOneAndDelete).toHaveBeenCalledWith({ otp: '12345' });
      expect(mockUserFindByIdAndUpdate).toHaveBeenCalledWith(mockUserId, {
        refreshToken: 'refresh-token',
      });
    });

    test('should throw error for invalid OTP', async () => {
      mockFindOneAndDelete.mockResolvedValue(null);

      await expect(verifyOtpAndSignJwt('99999')).rejects.toThrow('Invalid OTP');
    });

    test('should throw error for expired OTP', async () => {
      const mockAuth = {
        userId: mockUserId,
        otp: '12345',
        expiresIn: new Date(Date.now() - 60 * 60 * 1000),
      };

      mockFindOneAndDelete.mockResolvedValue(mockAuth);

      await expect(verifyOtpAndSignJwt('12345')).rejects.toThrow('OTP expired');
    });
  });

  describe('refreshAccessToken', () => {
    test('should return new access token for valid refresh token', async () => {
      mockJwtVerify.mockReturnValue({ id: mockUserId.toString() });
      mockGetUserById.mockResolvedValue(mockUser);
      mockJwtSign.mockReturnValue('new-access-token');

      const result = await refreshAccessToken('valid-refresh-token');

      expect(result).toEqual({ accessToken: 'new-access-token' });
      expect(mockJwtVerify).toHaveBeenCalledWith(
        'valid-refresh-token',
        'refresh'
      );
      expect(mockGetUserById).toHaveBeenCalledWith(mockUserId.toString());
    });

    test('should throw error for invalid refresh token', async () => {
      mockJwtVerify.mockReturnValue(null);

      await expect(refreshAccessToken('invalid-token')).rejects.toThrow(
        'Invalid refresh token'
      );
    });

    test('should throw error for revoked refresh token', async () => {
      mockJwtVerify.mockReturnValue({ id: mockUserId.toString() });
      mockGetUserById.mockResolvedValue({
        ...mockUser,
        refreshToken: 'different-token',
      });

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
