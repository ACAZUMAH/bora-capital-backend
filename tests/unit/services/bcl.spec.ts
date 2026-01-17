import { describe, test, expect, jest, beforeEach } from '@jest/globals';

// Mock the BCL client with explicit any type
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

// Import AFTER mocks are set up
import { addIndividualIdentity, fetchIdentity } from 'src/services/users';
import { fetchPortfolios, fetchPortfolioById } from 'src/services/portfolio';

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
        IdentityDetails: [mockIdentityDetails],
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

describe('BCL Portfolio Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPortfolios', () => {
    test('should return all portfolios on success', async () => {
      const mockPortfolios = [
        {
          PortfolioID: 'BBF1100',
          PortfolioName: 'BORA BALANCED UNIT TRUST',
          OfferPrice: 0.2096,
        },
        {
          PortfolioID: 'BBF1200',
          PortfolioName: 'BORA GROWTH FUND',
          OfferPrice: 0.315,
        },
      ];
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Request successful' }],
        Portfolios: mockPortfolios,
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      const result = await fetchPortfolios();

      expect(result).toEqual(mockPortfolios);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchciportfolios_bcl',
        { PortfolioID: '' }
      );
    });

    test('should filter by portfolioId when provided', async () => {
      const mockPortfolio = {
        PortfolioID: 'BBF1100',
        PortfolioName: 'BORA BALANCED UNIT TRUST',
        OfferPrice: 0.2096,
      };
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Request successful' }],
        Portfolios: [mockPortfolio],
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      const result = await fetchPortfolios('BBF1100');

      expect(result).toEqual([mockPortfolio]);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchciportfolios_bcl',
        { PortfolioID: 'BBF1100' }
      );
    });

    test('should throw error when BCL returns failure status', async () => {
      const mockResponse = {
        Status: [{ Status: '1', Description: 'Failed to fetch portfolios' }],
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      await expect(fetchPortfolios()).rejects.toThrow(
        'Failed to fetch portfolios'
      );
    });

    test('should throw error when BCL API fails', async () => {
      mockBclClientPost.mockRejectedValue({
        response: {
          data: { Message: 'Service unavailable' },
        },
      });

      await expect(fetchPortfolios()).rejects.toThrow('Service unavailable');
    });
  });

  describe('fetchPortfolioById', () => {
    test('should return portfolio when found', async () => {
      const mockPortfolio = {
        PortfolioID: 'BBF1100',
        PortfolioName: 'BORA BALANCED UNIT TRUST',
        OfferPrice: 0.2096,
      };
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Request successful' }],
        Portfolios: [mockPortfolio],
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      const result = await fetchPortfolioById('BBF1100');

      expect(result).toEqual(mockPortfolio);
    });

    test('should return null when portfolio not found', async () => {
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Request successful' }],
        Portfolios: [],
      };

      mockBclClientPost.mockResolvedValue(mockResponse);

      const result = await fetchPortfolioById('NONEXISTENT');

      expect(result).toBeNull();
    });
  });
});
