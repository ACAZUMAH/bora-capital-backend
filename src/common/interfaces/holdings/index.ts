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

export interface CreateHoldingsInput {
  fundId: string | Types.ObjectId;
  portfolioId: string | Types.ObjectId;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  currentValue: number;
  currency?: string;
  lastPricedAt?: Date;
}

export interface UpdateHoldingsInput {
  id: string | Types.ObjectId;
  name?: string;
  symbol?: string;
  quantity?: number;
  purchasePrice?: number;
  currentPrice?: number;
  currentValue?: number;
  currency?: string;
  lastPricedAt?: Date;
  unrealizedPL?: number;
  realizedPL?: number;
}

export interface HoldingsFilters {
  limit?: number;
  page?: number;
  fundId?: string | Types.ObjectId;
  portfolioId?: string | Types.ObjectId;
  search?: string;
}