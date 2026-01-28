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

import { fetchPortfolios, fetchPortfolioById } from 'src/services/portfolio';

describe('Portfolio Service', () => {
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

      expect(result).toEqual([
        {
          portfolioId: 'BBF1100',
          portfolioName: 'BORA BALANCED UNIT TRUST',
          offerPrice: 0.2096,
        },
        {
          portfolioId: 'BBF1200',
          portfolioName: 'BORA GROWTH FUND',
          offerPrice: 0.315,
        },
      ]);
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

      expect(result).toEqual([
        {
          portfolioId: 'BBF1100',
          portfolioName: 'BORA BALANCED UNIT TRUST',
          offerPrice: 0.2096,
        },
      ]);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchciportfolios_bcl',
        { PortfolioID: 'BBF1100' }
      );
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

      expect(result).toEqual({
        portfolioId: 'BBF1100',
        portfolioName: 'BORA BALANCED UNIT TRUST',
        offerPrice: 0.2096,
      });
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
