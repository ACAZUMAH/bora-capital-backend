import { Types } from 'mongoose';

/**
 * BCL Account types
 */
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

export interface BclFetchAccountRequest {
  IdentityID: string;
  PrimaryEmail: string;
  MobileNumber: string;
  AccountNumber?: string;
  ReturnNav?: boolean;
}

export interface BclAccount {
  AccountNumber: string;
  AccountName: string;
  PortfolioID: string;
  PortfolioName: string;
  CurrencyCode: string;
  Balance?: number;
  NAV?: number;
}

export interface BclFetchAccountsResponse {
  Status: Array<{ Status: string; Description: string }>;
  Accounts: BclAccount[];
}
