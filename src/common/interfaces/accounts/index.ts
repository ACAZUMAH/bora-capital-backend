import { BclStatus } from '../bcl';

export interface CreateAccountInput {
  portfolioId: string;
  accountName: string;
  currencyCode: string;
}

export interface BclCreateAccountRequest {
  IdentityID: string;
  PrimaryEmail: string;
  MobileNumber: string;
  PortfolioID: string;
  AccountName: string;
  CurrencyCode: string;
}

export interface BclCreateAccountSuccessResponse {
  Status: BclStatus[];
  CIAccountNumber: Array<{ AccountNumber: string }>;
}

export interface BclCreateAccountFailureResponse {
  Response?: number;
  Message: string;
}

export type BclCreateAccountResponse =
  | BclCreateAccountSuccessResponse
  | BclCreateAccountFailureResponse;

export interface BclFetchAccountRequest {
  IdentityID: string;
  PrimaryEmail: string;
  MobileNumber: string;
  AccountNumber?: string;
  ReturnNav?: boolean;
}

export interface BclAccount {
  PortfolioID: string;
  PortfolioName: string;
  AccountNumber: string;
  AccountName: string;
  Amount?: number;
  Nav?: number;
}

export interface BclFetchAccountSuccessResponse {
  Status: BclStatus[];
  Account: BclAccount[];
}

export interface BclFetchAccountFailureResponse {
  Message: string;
}

export type BclFetchAccountResponse =
  | BclFetchAccountSuccessResponse
  | BclFetchAccountFailureResponse;

export interface BclFetchAccountsResponse {
  Status: BclStatus[];
  Accounts: BclAccount[];
}

export interface BclFetchAccountsFailureResponse {
  Message: string;
}

export type BclFetchAccountsApiResponse =
  | BclFetchAccountsResponse
  | BclFetchAccountsFailureResponse;
