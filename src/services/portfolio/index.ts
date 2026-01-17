import createError from 'http-errors';
import { bclClient } from '../bcl';
import { BclPortfolio, FetchPortfoliosResponse } from 'src/common/interfaces';

/**
 * Fetch available portfolios (investment products) from BCL
 * @param portfolioId - Optional portfolio ID to filter
 * @returns Array of portfolios with offer prices
 */
export const fetchPortfolios = async (
  portfolioId?: string
): Promise<BclPortfolio[]> => {
  try {
    const response = (await bclClient.post(
      '/api/partner/fetchciportfolios_bcl',
      { PortfolioID: portfolioId || '' }
    )) as FetchPortfoliosResponse;

    if (response.Status?.[0]?.Status === '0' && response.Portfolios) {
      return response.Portfolios;
    }

    throw createError.BadRequest(
      response.Status?.[0]?.Description || 'Failed to fetch portfolios'
    );
  } catch (error: any) {
    if (error.response?.data?.Message) {
      throw createError.BadRequest(error.response.data.Message);
    }
    throw error;
  }
};

/**
 * Fetch a single portfolio by ID
 * @param portfolioId - Portfolio ID
 * @returns Portfolio or null if not found
 */
export const fetchPortfolioById = async (
  portfolioId: string
): Promise<BclPortfolio | null> => {
  const portfolios = await fetchPortfolios(portfolioId);
  return portfolios.find(p => p.PortfolioID === portfolioId) || null;
};
