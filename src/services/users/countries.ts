import createError from 'http-errors';
import { bclClient } from 'src/services/bcl';
import logger from 'src/loggers/logger';
import { FetchCountriesSuccessResponse } from 'src/common/interfaces/user';
import { CountriesFilters } from 'src/common/interfaces/graphql';

export const getCountries = async (filters: CountriesFilters) => {
  try {
    const response = (await bclClient.post('/api/partner/fetchcountries', {
      CountryID: filters.CountryId,
    })) as FetchCountriesSuccessResponse;

    if (
      'Status' in response &&
      response.Status?.[0]?.Status === '0' &&
      Array.isArray(response.CountryDetails)
    ) {
      return response.CountryDetails.map(country => ({
        countryCode: country.CountryCode,
        countryName: country.CountryName,
      }));
    }

    const errorMessage =
      response.Status?.[0]?.Description || 'Failed to fetch countries';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('fetch countries failed', error);
      throw createError.BadRequest(error.message);
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw createError.InternalServerError('Failed to fetch countries');
  }
};
