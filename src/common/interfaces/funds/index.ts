import { Types } from 'mongoose';

export interface FundsDocument {
  _id: Types.ObjectId;
  name: string;
  symbol: string;
  description: string;
  assetClass: string;
  objective: string;
  inceptionDate: Date;
  baseCurrency: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFundInput {
  name: string;
  symbol: string;
  description: string;
  assetClass: string;
  objective: string;
  baseCurrency: string;
  inceptionDate: Date;
}

export interface UpdateFundInput {
  fundId: string | Types.ObjectId;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
  objective?: string | null;
}
