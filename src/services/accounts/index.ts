import createError from 'http-errors';
import { bclClient } from '../bcl';
import { getUserById, linkAccountNumber } from '../users';
import {
  CreateAccountInput,
  BclCreateAccountRequest,
  BclCreateAccountResponse,
  BclCreateAccountSuccessResponse,
  BclFetchAccountsApiResponse,
  BclFetchAccountResponse,
  BclAccount,
  BclFetchAccountRequest,
} from 'src/common/interfaces';
import { Types } from 'mongoose';
import {
  isCreateAccountSuccess,
  isFetchAccountsSuccess,
  isFetchAccountSuccess,
} from './helpers';
import logger from 'src/loggers/logger';

/**
 * Create an investment account in BCL
 * @param userId - Local user ID
 * @param data - Account creation data (portfolioId, accountName, currencyCode)
 * @returns Created account with account number
 */
export const createAccount = async (
  userId: string | Types.ObjectId,
  data: CreateAccountInput
) => {
  const user = await getUserById(userId);

  if (!user.identityId) {
    throw createError.BadRequest(
      'Please complete KYC before creating an investment account'
    );
  }

  const request: BclCreateAccountRequest = {
    IdentityID: user.identityId,
    PrimaryEmail: user.email,
    MobileNumber: user.phoneNumber || '',
    PortfolioID: data.portfolioId,
    AccountName: data.accountName,
    CurrencyCode: data.currencyCode,
  };

  try {
    const response = (await bclClient.post(
      '/api/partner/addciaccount_bcl',
      request
    )) as BclCreateAccountResponse;

    if ('Message' in response && !('Status' in response)) {
      throw createError.BadRequest(response.Message);
    }
    if (
      isCreateAccountSuccess(response) &&
      response.Status?.[0]?.Status === '0' &&
      response.CIAccountNumber?.[0]?.AccountNumber
    ) {
      const accountNumber = response.CIAccountNumber[0].AccountNumber;

      await linkAccountNumber(userId, accountNumber);

      return {
        accountNumber,
        accountName: data.accountName,
        portfolioId: data.portfolioId,
      };
    }

    const errorMessage =
      (response as BclCreateAccountSuccessResponse).Status?.[0]?.Description ||
      'Failed to create investment account';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('creating account failed', error);
      return;
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};

/**
 * Fetch all investment accounts for a user from BCL with NAV
 * @param userId - Local user ID
 * @returns Array of user's investment accounts
 */
export const fetchUserAccountsWithNav = async (
  userId: string | Types.ObjectId
) => {
  const user = await getUserById(userId);

  if (!user.identityId) {
    return [];
  }

  const request: BclFetchAccountRequest = {
    IdentityID: user.identityId,
    PrimaryEmail: user.email,
    MobileNumber: user.phoneNumber || '',
    ReturnNav: true,
  };

  try {
    const response = (await bclClient.post(
      '/api/partner/fetchciaccounts_bcl',
      request
    )) as BclFetchAccountsApiResponse;

    if ('Message' in response) {
      throw createError.BadRequest(response.Message);
    }

    if (
      isFetchAccountsSuccess(response) &&
      response.Status?.[0]?.Status === '0'
    ) {
      return response.Accounts;
    }

    return [];
  } catch (error: any) {
    if (error.status) {
      logger.error('fetching user accounts failed', error);
      return;
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};

/**
 * Fetch all investment accounts for a user from BCL without NAV
 * @param userId - Local user ID
 * @returns Array of user's investment accounts
 */
export const fetchUserAccounts = async (userId: string | Types.ObjectId) => {
  const user = await getUserById(userId);

  if (!user.identityId) {
    return [];
  }

  const request: BclFetchAccountRequest = {
    IdentityID: user.identityId,
    PrimaryEmail: user.email,
    MobileNumber: user.phoneNumber || '',
  };

  try {
    const response = (await bclClient.post(
      '/api/partner/fetchciaccounts_bcl',
      request
    )) as BclFetchAccountsApiResponse;

    if ('Message' in response) {
      throw createError.BadRequest(response.Message);
    }

    if (
      isFetchAccountsSuccess(response) &&
      response.Status?.[0]?.Status === '0'
    ) {
      return response.Accounts;
    }

    return [];
  } catch (error: any) {
    if (error.status) {
      logger.error(
        'fetching user accounts failed',
        JSON.stringify(error, null, 2)
      );
      return;
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};

/**
 * Fetch a single investment account by account number
 * @param userId - Local user ID
 * @param accountNumber - BCL account number
 * @returns Account details or null
 */
export const fetchAccount = async (
  userId: string | Types.ObjectId,
  accountNumber: string
) => {
  const user = await getUserById(userId);

  if (!user.identityId) {
    return null;
  }

  const request: BclFetchAccountRequest = {
    IdentityID: user.identityId,
    PrimaryEmail: user.email,
    MobileNumber: user.phoneNumber || '',
    AccountNumber: accountNumber,
    ReturnNav: true,
  };

  try {
    const response = (await bclClient.post(
      '/api/partner/fetchciaccount_bcl',
      request
    )) as BclFetchAccountResponse;

    if ('Message' in response && !('Status' in response)) {
      throw createError.BadRequest(response.Message);
    }

    if (
      isFetchAccountSuccess(response) &&
      response.Status?.[0]?.Status === '0'
    ) {
      return response.Account?.[0] || null;
    }

    return null;
  } catch (error: any) {
    if (error.status) {
      logger.error(
        'fetching user account failed',
        JSON.stringify(error, null, 2)
      );
      return;
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};
