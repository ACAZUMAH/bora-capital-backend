import { Types } from "mongoose";

export interface holdingsDocument {
  _id: string | Types.ObjectId;
  fundId: string | Types.ObjectId;
  symbol: string;
  name: string;
  quantity: number;
  averagePurchasePrice: number;
  currentPrice: number;
  currentValue: number;
  unrealizedGainLoss: number;
  currency: string;
  lastPricedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
