import { Types } from "mongoose";
import { TransactionStatus, TransactionType } from "src/common/enums";

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
  status: TransactionStatus;
  executedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
