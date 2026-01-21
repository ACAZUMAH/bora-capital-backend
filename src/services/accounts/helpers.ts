import {
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
