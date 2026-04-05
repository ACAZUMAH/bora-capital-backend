import {
  BclAccount,
  BclCreateAccountResponse,
  BclCreateAccountSuccessResponse,
  BclFetchAccountResponse,
  BclFetchAccountsApiResponse,
  BclFetchAccountsResponse,
  BclFetchAccountSuccessResponse,
} from 'src/common/interfaces';

export const isCreateAccountSuccess = (
  response: BclCreateAccountResponse
): response is BclCreateAccountSuccessResponse => {
  return 'Status' in response && 'CIAccountNumber' in response;
};

export const isFetchAccountSuccess = (
  response: BclFetchAccountResponse
): response is BclFetchAccountSuccessResponse => {
  return 'Status' in response && 'Account' in response;
};

export const isFetchAccountsSuccess = (
  response: BclFetchAccountsApiResponse
): response is BclFetchAccountsResponse => {
  return 'Status' in response && 'Accounts' in response;
};

export const normalizeAccount = (a: BclAccount) => ({
  accountNumber: a.AccountNumber,
  accountName: a.AccountName,
  portfolioId: a.PortfolioID,
  portfolioName: a.PortfolioName,
  balance: a.Amount,
  nav: a.Nav,
});
