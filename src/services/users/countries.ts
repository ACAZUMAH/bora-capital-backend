import createError from 'http-errors';
import { bclClient } from 'src/services/bcl';
import logger from 'src/loggers/logger';
import { FetchCountriesSuccessResponse } from 'src/common/interfaces/user';

export const getCountries = async () => {
  try {
    const response = (await bclClient.post(
      '/api/partner/fetchcountrylist_bcl',
      {}
    )) as FetchCountriesSuccessResponse;

    if (
      'Status' in response &&
      response.Status?.[0]?.Status === '0' &&
      Array.isArray(response.CountryDetails)
    ) {
      return response.CountryDetails;
    }

    const errorMessage =
      response.Status?.[0]?.Description || 'Failed to fetch countries';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('fetch countries failed', error);
      return [];
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    return [];
  }
};
