import { Types } from 'mongoose';
import {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
} from 'src/common/enums';

export interface TransactionsDocument {
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  fundId: string | Types.ObjectId;
  portfolioId: string | Types.ObjectId;
  type: TransactionType;
  amount: number;
  currency: string;
  quantity: number;
  providerId: string | Types.ObjectId;
  bankAccountId: string | Types.ObjectId;
  reference: string;
  description: string;
  paymentStatus: TransactionStatus;
  paymentMethod: PaymentMethod;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionInput {
  userId: string;
  fundId: string;
  portfolioId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  quantity: number;
  providerId?: string | null;
  bankAccountId?: string | null;
  reference?: string | null;
  description?: string | null;
  paymentStatus?: TransactionStatus | null;
  paymentMethod?: PaymentMethod | null;
}
export interface UpdateTransactionInput {}

export interface TransactionsFilters {
  limit?: number;
  page?: number;
  userId?: string;
  fundId?: string;
  portfolioId?: string;
  providerId?: string;
  bankAccountId?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}
