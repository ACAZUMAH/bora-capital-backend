import { Types } from "mongoose";

export interface HoldingsDocument {
  _id: string | Types.ObjectId;
  fundId: string | Types.ObjectId;
  portfolioId: string | Types.ObjectId;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  currentValue: number;
  unrealizedPL: number;
  realizedPL: number;
  currency: string;
  lastPricedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
