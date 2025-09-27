import { Types } from "mongoose";

export interface portfolioDocument {
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  name: string;
  totalValue: number;
  currency: string;
  asOf: Date;

  holdings: [];

  transactions: [];

  createdAt: Date;
  updatedAt: Date;
}
