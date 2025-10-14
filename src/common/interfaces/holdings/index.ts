import { Types } from 'mongoose';

export interface HoldingsDocument {
  _id: string | Types.ObjectId;
  fundId: string | Types.ObjectId;
  portfolioId: string | Types.ObjectId;
  symbol: string;
  quantity: number;
  avgPurchasePrice: number;
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
  quantity: number;
  avgPurchasePrice: number;
  currentPrice: number;
  currentValue: number;
  currency?: string;
  lastPricedAt?: Date;
}

export interface UpdateHoldingsInput {
  id: string | Types.ObjectId;
  symbol?: string;
  quantity?: number;
  avgPurchasePrice?: number;
  currentPrice?: number;
  currentValue?: number;
  currency?: string;
  lastPricedAt?: Date;
  unrealizedPL?: number;
  realizedPL?: number;
}

export interface HoldingsFilters {
  limit?: number | null;
  page?: number | null;
  fundId?: string | Types.ObjectId | null;
  portfolioId?: string | Types.ObjectId | null;
  search?: string | null;
}
