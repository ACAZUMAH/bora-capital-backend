import { describe, test, expect, jest, beforeEach } from '@jest/globals';

// Mock the BCL client
const mockBclClientPost = jest.fn<any>();

jest.mock('src/services/bcl/client', () => ({
  bclClient: {
    post: mockBclClientPost,
  },
}));

// Mock uuid to prevent ESM issues
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

import { getBanks } from 'src/services/transactions/banks';

describe('Banks Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBanks', () => {
    test('should return normalized banks on success', async () => {
      const mockBanks = [
        {
          BankID: 'BANK001',
          BankName: 'Test Bank',
          BankCode: 'TB001',
        },
        {
          BankID: 'BANK002',
          BankName: 'Another Bank',
          BankCode: 'AB002',
        },
      ];

      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Success' }],
        BankDetails: mockBanks,
      });

      const result = await getBanks({});

      expect(result).toEqual([
        { bankId: 'BANK001', bankName: 'Test Bank', bankCode: 'TB001' },
        { bankId: 'BANK002', bankName: 'Another Bank', bankCode: 'AB002' },
      ]);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchbanks',
        { BankID: undefined }
      );
    });

    test('should throw error when BCL returns error message', async () => {
      mockBclClientPost.mockRejectedValue({
        Message: 'Banks not available',
      });

      await expect(getBanks({})).rejects.toThrow('Failed to fetch banks');
    });

    test('should throw error when BCL returns failure status', async () => {
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '1', Description: 'Failed to fetch banks' }],
      });

      await expect(getBanks({})).rejects.toThrow('Failed to fetch banks');
    });

    test('should throw error when request fails with status', async () => {
      const error = { status: 500, message: 'Server error' };
      mockBclClientPost.mockRejectedValue(error);

      await expect(getBanks({})).rejects.toThrow('Server error');
    });

    test('should throw error when request fails with response message', async () => {
      const error = { response: { Message: 'Invalid request' } };
      mockBclClientPost.mockRejectedValue(error);

      await expect(getBanks({})).rejects.toThrow('Invalid request');
    });

    test('should throw InternalServerError on unknown error', async () => {
      const error = new Error('Unknown error');
      mockBclClientPost.mockRejectedValue(error);

      await expect(getBanks({})).rejects.toThrow('Failed to fetch banks');
    });
  });
});
