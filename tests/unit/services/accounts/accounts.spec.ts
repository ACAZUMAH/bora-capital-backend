import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { Types } from 'mongoose';

// Mock the BCL client
const mockBclClientPost = jest.fn<any>();

jest.mock('src/services/bcl/client', () => ({
  bclClient: {
    post: mockBclClientPost,
  },
}));

// Mock user service
const mockGetUserById = jest.fn<any>();
const mockLinkAccountNumber = jest.fn<any>();

jest.mock('src/services/users', () => ({
  getUserById: mockGetUserById,
  linkAccountNumber: mockLinkAccountNumber,
}));

// Mock uuid to prevent ESM issues
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

import {
  createAccount,
  fetchUserAccounts,
  fetchUserAccountsWithNav,
  fetchAccount,
} from 'src/services/accounts';

describe('Account Service', () => {
  const mockUserId = new Types.ObjectId();
  const mockUser = {
    _id: mockUserId,
    email: 'test@example.com',
    phoneNumber: '+233700000000',
    identityId: '0000001099',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAccount', () => {
    const mockCreateData = {
      portfolioId: 'BBF1100',
      accountName: 'My Investment Account',
      currencyCode: 'KES',
    };

    test('should create account successfully', async () => {
      mockGetUserById.mockResolvedValue(mockUser);
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Request successful' }],
        CIAccountNumber: [{ AccountNumber: 'BB00252' }],
      });
      mockLinkAccountNumber.mockResolvedValue(mockUser);

      const result = await createAccount(mockUserId, mockCreateData);

      expect(result).toEqual({
        accountNumber: 'BB00252',
        accountName: 'My Investment Account',
        portfolioId: 'BBF1100',
      });
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/addciaccount_bcl',
        expect.objectContaining({
          IdentityID: '0000001099',
          PortfolioID: 'BBF1100',
          AccountName: 'My Investment Account',
          CurrencyCode: 'KES',
        })
      );
      expect(mockLinkAccountNumber).toHaveBeenCalledWith(mockUserId, 'BB00252');
    });
  });

  describe('fetchUserAccountsWithNav', () => {
    test('should return user accounts with NAV successfully', async () => {
      const mockAccounts = [
        {
          AccountNumber: 'BB00252',
          AccountName: 'My Account',
          PortfolioID: 'BBF1100',
          PortfolioName: 'BORA BALANCED UNIT TRUST',
          CurrencyCode: 'KES',
          Balance: 10000,
          NAV: 0.2096,
        },
      ];

      mockGetUserById.mockResolvedValue(mockUser);
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Request successful' }],
        Accounts: mockAccounts,
      });

      const result = await fetchUserAccountsWithNav(mockUserId);

      expect(result).toEqual(mockAccounts);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchciaccounts_bcl',
        expect.objectContaining({
          IdentityID: '0000001099',
          ReturnNav: true,
        })
      );
    });

    test('should return empty array if user has no identityId', async () => {
      mockGetUserById.mockResolvedValue({ ...mockUser, identityId: undefined });

      const result = await fetchUserAccountsWithNav(mockUserId);

      expect(result).toEqual([]);
      expect(mockBclClientPost).not.toHaveBeenCalled();
    });
  });

  describe('fetchUserAccounts', () => {
    test('should return user accounts without NAV successfully', async () => {
      const mockAccounts = [
        {
          AccountNumber: 'BB00252',
          AccountName: 'My Account',
          PortfolioID: 'BBF1100',
          PortfolioName: 'BORA BALANCED UNIT TRUST',
          CurrencyCode: 'KES',
          Balance: 10000,
        },
      ];

      mockGetUserById.mockResolvedValue(mockUser);
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Request successful' }],
        Accounts: mockAccounts,
      });

      const result = await fetchUserAccounts(mockUserId);

      expect(result).toEqual(mockAccounts);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchciaccounts_bcl',
        expect.objectContaining({
          IdentityID: '0000001099',
        })
      );

      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchciaccounts_bcl',
        expect.not.objectContaining({
          ReturnNav: true,
        })
      );
    });

    test('should return empty array if user has no identityId', async () => {
      mockGetUserById.mockResolvedValue({ ...mockUser, identityId: undefined });

      const result = await fetchUserAccounts(mockUserId);

      expect(result).toEqual([]);
      expect(mockBclClientPost).not.toHaveBeenCalled();
    });

    test('should return empty array when BCL returns failure status', async () => {
      mockGetUserById.mockResolvedValue(mockUser);
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '1', Description: 'No accounts found' }],
      });

      const result = await fetchUserAccounts(mockUserId);

      expect(result).toEqual([]);
    });
  });

  describe('fetchAccount', () => {
    test('should return account when found', async () => {
      const mockAccount = {
        AccountNumber: 'BB00252',
        AccountName: 'My Account',
        PortfolioID: 'BBF1100',
        PortfolioName: 'BORA BALANCED UNIT TRUST',
        CurrencyCode: 'KES',
        Balance: 10000,
      };

      mockGetUserById.mockResolvedValue(mockUser);
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Request successful' }],
        Account: [mockAccount],
      });

      const result = await fetchAccount(mockUserId, 'BB00252');

      expect(result).toEqual(mockAccount);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchciaccount_bcl',
        expect.objectContaining({
          IdentityID: '0000001099',
          AccountNumber: 'BB00252',
        })
      );
    });

    test('should return null if user has no identityId', async () => {
      mockGetUserById.mockResolvedValue({ ...mockUser, identityId: undefined });

      const result = await fetchAccount(mockUserId, 'BB00252');

      expect(result).toBeNull();
      expect(mockBclClientPost).not.toHaveBeenCalled();
    });

    test('should return null when account not found', async () => {
      mockGetUserById.mockResolvedValue(mockUser);
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Request successful' }],
        Account: [],
      });

      const result = await fetchAccount(mockUserId, 'NONEXISTENT');

      expect(result).toBeNull();
    });
  });
});
