import { describe, test, expect, jest, beforeEach } from '@jest/globals';

// Mock the BCL client with explicit any type
const mockBclClientPost = jest.fn<any>();

jest.mock('src/services/bcl/client', () => ({
  bclClient: {
    post: mockBclClientPost,
  },
}));

import {
  addIndividualIdentity,
  fetchIdentity,
} from 'src/services/bcl/kyc.service';

describe('BCL KYC Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addIndividualIdentity', () => {
    const mockKycData = {
      FirstName: 'John',
      LastName: 'Doe',
      Gender: 'M',
      DateOfBirth: '01 Jan 1990',
      ResidencyStatus: 'R',
      IDNumber: '123456789',
      SourceOfFunds: '1',
      Occupation: 'IT',
      NextOfKin: 'Jane Doe',
      PostalAddress: '123 Street',
      NationalityCountryCode: 'GH',
      ResidencyCountryCode: 'GH',
      CurrencyCode: 'GHS',
      PhysicalAddress: '123 Street, City',
      MobileNumber: '+233700000000',
      PrimaryEmail: 'john@example.com',
    };

    test('should return IdentityID on successful creation', async () => {
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Request successful' }],
        IdentityID: [{ IdentityID: '0000001099' }],
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      const result = await addIndividualIdentity(mockKycData);

      expect(result).toBe('0000001099');
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/addindividualidentity_bcl',
        mockKycData
      );
    });

    test('should throw error when BCL returns failure status', async () => {
      const mockResponse = {
        Status: [{ Status: '1', Description: 'ID Number already exists' }],
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      await expect(addIndividualIdentity(mockKycData)).rejects.toThrow(
        'ID Number already exists'
      );
    });

    test('should throw error when BCL API fails', async () => {
      mockBclClientPost.mockRejectedValue({
        response: {
          data: { Message: 'Request failed' },
        },
      });

      await expect(addIndividualIdentity(mockKycData)).rejects.toThrow(
        'Request failed'
      );
    });
  });

  describe('fetchIdentity', () => {
    const mockFetchData = {
      IdentityID: '0000001099',
      PrimaryEmail: 'john@example.com',
      MobileNumber: '+233700000000',
    };

    test('should return identity data on success', async () => {
      const mockIdentityDetails = { FirstName: 'John', LastName: 'Doe' };
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Request successful' }],
        identityDetails: mockIdentityDetails,
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      const result = await fetchIdentity(mockFetchData);

      expect(result).toEqual(mockIdentityDetails);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchidentity_bcl',
        mockFetchData
      );
    });

    test('should throw error when identity not found', async () => {
      mockBclClientPost.mockRejectedValue({
        response: {
          data: { Message: 'Request failed, no records retrieved' },
        },
      });

      await expect(fetchIdentity(mockFetchData)).rejects.toThrow(
        'Request failed, no records retrieved'
      );
    });
  });
});
