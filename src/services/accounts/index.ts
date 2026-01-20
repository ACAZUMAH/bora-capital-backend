import createError from 'http-errors';
import { bclClient } from '../bcl';
import { getUserById, linkAccountNumber } from '../users';
import {
  CreateAccountInput,
  BclCreateAccountRequest,
  BclFetchAccountsResponse,
  BclAccount,
  BclFetchAccountRequest,
} from 'src/common/interfaces';
import { Types } from 'mongoose';

/**
 * Create an investment account in BCL
 * @param userId - Local user ID
 * @param data - Account creation data (portfolioId, accountName, currencyCode)
 * @returns Created account with account number
 */
export const createAccount = async (
  userId: string | Types.ObjectId,
  data: CreateAccountInput
): Promise<{
  accountNumber: string;
  accountName: string;
  portfolioId: string;
}> => {
  const user = await getUserById(userId);

  // User must have completed KYC
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
    const response = await bclClient.post(
      '/api/partner/addciaccount_bcl',
      request
    );

    if (
      response?.status?.[0]?.Status === '0' &&
      response?.CIAccountNumber?.[0]?.AccountNumber
    ) {
      const accountNumber = response.CIAccountNumber[0].AccountNumber;

      // Link account to user
      await linkAccountNumber(userId, accountNumber);

      return {
        accountNumber,
        accountName: data.accountName,
        portfolioId: data.portfolioId,
      };
    }

    const errorMessage =
      response?.status?.[0]?.Description ||
      'Failed to create investment account';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw error;
  }
};

/**
 * Fetch all investment accounts for a user from BCL with NAV
 * @param userId - Local user ID
 * @returns Array of user's investment accounts
 */
export const fetchUserAccountsWithNav = async (
  userId: string | Types.ObjectId
): Promise<BclAccount[]> => {
  const user = await getUserById(userId);

  if (!user.identityId) {
    return []; // No accounts if KYC not complete
  }

  const request: BclFetchAccountRequest = {
    IdentityID: user.identityId,
    PrimaryEmail: user.email,
    MobileNumber: user.phoneNumber || '',
    ReturnNav: true,
  };

  try {
    const response = await bclClient.post(
      '/api/partner/fetchciaccounts_bcl',
      request
    );

    if (response.Status?.[0]?.Status === '0' && response.Accounts) {
      return response.Accounts;
    }

    return [];
  } catch (error: any) {
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw error;
  }
};

/**
 * Fetch all investment accounts for a user from BCL without NAV
 * @param userId - Local user ID
 * @returns Array of user's investment accounts
 */
export const fetchUserAccounts = async (
  userId: string | Types.ObjectId
): Promise<BclAccount[]> => {
  const user = await getUserById(userId);

  if (!user.identityId) {
    return []; // No accounts if KYC not complete
  }

  const request: BclFetchAccountRequest = {
    IdentityID: user.identityId,
    PrimaryEmail: user.email,
    MobileNumber: user.phoneNumber || '',
  };

  try {
    const response = await bclClient.post(
      '/api/partner/fetchciaccounts_bcl',
      request
    );

    if (response.Status?.[0]?.Status === '0' && response.Accounts) {
      return response.Accounts;
    }

    return [];
  } catch (error: any) {
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw error;
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
): Promise<BclAccount | null> => {
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
    const response = await bclClient.post(
      '/api/partner/fetchciaccount_bcl',
      request
    );

    if (response.Status?.[0]?.Status === '0' && response.Accounts?.length > 0) {
      return response.Accounts[0];
    }

    return null;
  } catch (error: any) {
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw error;
  }
};
