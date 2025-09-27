import { model, Schema } from "mongoose";
import { TransactionStatus, TransactionType } from "src/common/enums";
import { TransactionsDocument } from "src/common/interfaces";

const transactionSchema = new Schema<TransactionsDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    fundId: { type: Schema.Types.ObjectId, ref: "Funds", required: true },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "GHS" },
    quantity: { type: Number, required: true },
    providerId: { type: String },
    bankAccountId: { type: Schema.Types.ObjectId, ref: "BankAccounts" },
    reference: { type: String, required: true, unique: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      required: true,
    },
    executedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const TransactionModel = model<TransactionsDocument>(
  "Transactions",
  transactionSchema
);
