import createError from 'http-errors';
import { bclClient } from '../bcl';
import { BclPortfolio, FetchPortfoliosResponse } from 'src/common/interfaces';
import { isSuccessResponse, normalizePortfolio } from './helpers';
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
      logger.error(
        'fetching portfolios failed',
        JSON.stringify(response, null, 2)
      );
      throw createError.BadRequest(response.Message);
    }
    if (isSuccessResponse(response) && response.Status?.[0]?.Status === '0') {
      return response.Portfolios.map(normalizePortfolio);
    }

    logger.error(
      'fetching portfolios failed',
      JSON.stringify(
        response.Status?.[0]?.Description || 'Failed to fetch portfolios',
        null,
        2
      )
    );
    throw createError.BadRequest(
      response.Status?.[0]?.Description || 'Failed to fetch portfolios'
    );
  } catch (error: any) {
    if (error.status) {
      logger.error(
        'fetching portfolios failed',
        JSON.stringify(error, null, 2)
      );
      throw createError.BadRequest(error.response.Message);
    }
    if (error.response?.Message) {
      logger.error(
        'fetching portfolios failed',
        JSON.stringify(error.response.Message, null, 2)
      );
      throw createError.BadRequest(error.response.Message);
    }
    logger.error('fetching portfolios failed', JSON.stringify(error, null, 2));
    throw createError.BadRequest(error);
  }
};

/**
 * Fetch a single portfolio by ID
 * @param portfolioId - Portfolio ID
 * @returns Portfolio or null if not found
 */
export const fetchPortfolioById = async (portfolioId: string) => {
  const portfolios = await fetchPortfolios(portfolioId);
  return portfolios.find(p => p.portfolioId === portfolioId) || null;
};
