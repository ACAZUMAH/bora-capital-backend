import createError from 'http-errors';
import { bclClient } from 'src/services/bcl';
import logger from 'src/loggers/logger';
import { FetchBanksSuccessResponse } from 'src/common/interfaces/transactions';

export const getBanks = async () => {
  try {
    const response = (await bclClient.post(
      '/api/partner/fetchbanklist_bcl',
      {}
    )) as FetchBanksSuccessResponse;

    if (
      'Status' in response &&
      response.Status?.[0]?.Status === '0' &&
      Array.isArray(response.BankDetails)
    ) {
      return response.BankDetails.map(bank => ({
        bankId: bank.BankID,
        bankName: bank.BankName,
        bankCode: bank.BankCode,
      }));
    }

    const errorMessage =
      response.Status?.[0]?.Description || 'Failed to fetch banks';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('fetch banks failed', error);
      return [];
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    return [];
  }
};
