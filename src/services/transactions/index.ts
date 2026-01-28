import {
  DepositCashInput,
  DepositCashSuccessResponse,
  FetchMiniStatementFilters,
  FetchMiniStatementSuccessResponse,
  FetchMiniStatementWithDateRangesFilters,
  WithdrawCashInput,
  WithdrawalSuccessResponse,
} from 'src/common/interfaces';
import createError from 'http-errors';
import { bclClient } from '../bcl';
import logger from 'src/loggers/logger';
import { getUserById } from '../users';
import * as GqlTypes from 'src/common/interfaces/graphql';
import dayjs from 'dayjs';

/**
 * @description Deposit cash to investment account
 * @param data - Deposit details
 */
export const depositCash = async (data: DepositCashInput) => {
  try {
    const response = (await bclClient.post(
      '/api/partner/depositcicash_bcl',
      data
    )) as DepositCashSuccessResponse;

    if ('Status' in response && response.Status?.[0]?.statusCode === '0') {
      return { erpReffID: response.Status?.[0]?.erpReffID };
    }

    const errorMessage =
      response.Status?.[0]?.statusMessage || 'Failed to deposit cash';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('deposit cash failed', error);
      return;
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};

/**
 * @description Withdraw cash from investment account
 * @param data - Withdrawal details
 */
export const withdrawCash = async (data: WithdrawCashInput) => {
  try {
    const response = (await bclClient.post(
      '/api/partner/addcicashwithdrawal_bcl',
      data
    )) as WithdrawalSuccessResponse;

    if ('Status' in response && response.Status?.[0]?.Status === '0') {
      return { description: response.Status?.[0]?.Description };
    }

    const errorMessage =
      response.Status?.[0]?.Description || 'Failed to withdraw cash';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('withdraw cash failed', error);
      return;
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};

/**
 * @description Fetch mini statement from BCL
 * @param data - Request details
 */
export const fetchMiniStatement = async (data: FetchMiniStatementFilters) => {
  try {
    const user = await getUserById(data.userId);

    const params = {
      AccountNumber: data.accountNumber,
      PrimaryEmail: user.email,
      MobileNumber: user.phoneNumber,
    };

    const response = (await bclClient.post(
      '/api/partner/fetchministatement_bcl',
      params
    )) as FetchMiniStatementSuccessResponse;

    if (
      'Status' in response &&
      response.Status?.[0]?.Status === '0' &&
      Array.isArray(response.CIMiniStatementDetails)
    ) {
      const transactions = response.CIMiniStatementDetails.map(transaction => {
        return {
          id: transaction.TranID,
          transactionType: transaction.TransactionType,
          transactionDate: dayjs(transaction.TransactionDate).toISOString(),
          instrument: transaction.Instrument,
          chequeNumber: transaction.ChequeNumber,
          bankId: transaction.BankID,
          bankName: transaction.BankName,
          currencyName: transaction.CurrencyName,
          amount: transaction.Amount,
          price: transaction.Price,
          units: transaction.Units,
          remarks: transaction.Remarks,
        };
      });

      return transactions;
    }

    const errorMessage =
      response.Status?.[0]?.Description || 'Failed to fetch mini statement';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('fetch mini statement failed', error);
      throw createError.BadRequest(
        error.response?.Message ||
          error.message ||
          'Failed to fetch mini statement'
      );
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw createError.BadRequest(
      error.message || 'Failed to fetch mini statement'
    );
  }
};

export const fetchTransactionsWithDateRanges = async (
  data: FetchMiniStatementWithDateRangesFilters
) => {
  try {
    const user = await getUserById(data.userId);

    const params = {
      AccountNumber: data.accountNumber,
      PrimaryEmail: user.email,
      MobileNumber: user.phoneNumber,
      FromDate: data.fromDate,
      ToDate: data.toDate,
    };

    const response = (await bclClient.post(
      '/api/partner/fetchciaccountStatement_bcl',
      params
    )) as FetchMiniStatementSuccessResponse;

    if (
      'Status' in response &&
      response.Status?.[0]?.Status === '0' &&
      Array.isArray(response.CIMiniStatementDetails)
    ) {
      return response.CIMiniStatementDetails.map(transaction => {
        return {
          id: transaction.TranID,
          transactionType: transaction.TransactionType,
          transactionDate: dayjs(transaction.TransactionDate).toISOString(),
          instrument: transaction.Instrument,
          chequeNumber: transaction.ChequeNumber,
          bankId: transaction.BankID,
          bankName: transaction.BankName,
          currencyName: transaction.CurrencyName,
          amount: transaction.Amount,
          price: transaction.Price,
          units: transaction.Units,
          remarks: transaction.Remarks,
        };
      });
    }

    const errorMessage =
      response.Status?.[0]?.Description ||
      'Failed to fetch transactions with date ranges';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('fetch transactions with date ranges failed', error);
      throw createError.BadRequest(
        error.response?.Message ||
          error.message ||
          'Failed to fetch transactions with date ranges'
      );
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw createError.BadRequest(
      error.message || 'Failed to fetch transactions with date ranges'
    );
  }
};
