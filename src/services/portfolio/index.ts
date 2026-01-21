import createError from 'http-errors';
import { bclClient } from '../bcl';
import { BclPortfolio, FetchPortfoliosResponse } from 'src/common/interfaces';
import { isSuccessResponse } from './helpers';
import logger from 'src/loggers/logger';

/**
 * Fetch available portfolios (investment products) from BCL
 * @param portfolioId - Optional portfolio ID to filter
 * @returns Array of portfolios with offer prices
 */
export const fetchPortfolios = async (portfolioId?: string) => {
  try {
    const response = (await bclClient.post(
      '/api/partner/fetchciportfolios_bcl',
      { PortfolioID: portfolioId || '' }
    )) as FetchPortfoliosResponse;

    if ('Message' in response) {
      throw createError.BadRequest(response.Message);
    }
    if (isSuccessResponse(response) && response.Status?.[0]?.Status === '0') {
      return response.Portfolios;
    }

    throw createError.BadRequest(
      response.Status?.[0]?.Description || 'Failed to fetch portfolios'
    );
  } catch (error: any) {
    if (error.status) {
      logger.error('fetching portfolios failed', error);
      return;
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
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
  return portfolios?.find(p => p.PortfolioID === portfolioId) || null;
};
