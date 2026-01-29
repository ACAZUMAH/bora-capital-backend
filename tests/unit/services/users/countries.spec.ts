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

import { getCountries } from 'src/services/users/countries';

describe('Countries Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountries', () => {
    test('should return normalized countries on success', async () => {
      const mockCountries = [
        {
          CountryCode: 'US',
          CountryName: 'United States',
        },
        {
          CountryCode: 'KE',
          CountryName: 'Kenya',
        },
      ];

      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Success' }],
        CountryDetails: mockCountries,
      });

      const result = await getCountries();

      expect(result).toEqual([
        { countryCode: 'US', countryName: 'United States' },
        { countryCode: 'KE', countryName: 'Kenya' },
      ]);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchcountrylist_bcl',
        {}
      );
    });

    test('should throw error when BCL returns error message', async () => {
      mockBclClientPost.mockRejectedValue({
        Message: 'Countries not available',
      });

      await expect(getCountries()).rejects.toThrow('Failed to fetch countries');
    });

    test('should throw error when BCL returns failure status', async () => {
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '1', Description: 'Failed to fetch countries' }],
      });

      await expect(getCountries()).rejects.toThrow('Failed to fetch countries');
    });

    test('should throw error when request fails with status', async () => {
      const error = { status: 500, message: 'Server error' };
      mockBclClientPost.mockRejectedValue(error);

      await expect(getCountries()).rejects.toThrow('Server error');
    });

    test('should throw error when request fails with response message', async () => {
      const error = { response: { Message: 'Invalid request' } };
      mockBclClientPost.mockRejectedValue(error);

      await expect(getCountries()).rejects.toThrow('Invalid request');
    });

    test('should throw InternalServerError on unknown error', async () => {
      const error = new Error('Unknown error');
      mockBclClientPost.mockRejectedValue(error);

      await expect(getCountries()).rejects.toThrow('Failed to fetch countries');
    });
  });
});
