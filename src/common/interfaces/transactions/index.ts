import { Types } from 'mongoose';
import { BclStatus } from '../bcl';

export interface DepositCashInput {
  transactionReference: string;
  extTranID: string;
  accountNumber: string;
  transactionDate: string;
  amount: string;
  narration: string;
}

export interface WithdrawCashInput {
  primaryEmail: string;
  mobileNumber: string;
  accountNumber: string;
  transactionDate: string;
  amount: string;
  comment: string;
}

export interface FetchMiniStatementFilters {
  userId: string | Types.ObjectId;
  accountNumber: string;
}

export interface FetchMiniStatementWithDateRangesFilters {
  userId: string | Types.ObjectId;
  accountNumber: string;
  fromDate: string;
  toDate: string;
}

export interface DepositTransactionStatus {
  statusCode: string;
  statusMessage: string;
  erpReffID?: string;
}

export interface DepositCashSuccessResponse {
  Status: DepositTransactionStatus[];
}

export interface WithdrawalSuccessResponse {
  Status: BclStatus[];
}

export interface MiniStatementItem {
  TranID: number;
  TransactionType: string;
  TransactionDate: string;
  Instrument: string;
  ChequeNumber: string;
  BankID: string;
  BankName: string;
  CurrencyName: string;
  Amount: number;
  Price: number;
  Units: number;
  Remarks: string;
}

export interface FetchMiniStatementSuccessResponse {
  Status: BclStatus[];
  CIMiniStatementDetails: MiniStatementItem[];
}

export interface Bank {
  BankID: string;
  BankName: string;
  BankCode: string;
}

export interface FetchBanksSuccessResponse {
  Status: BclStatus[];
  BankDetails: Bank[];
}
