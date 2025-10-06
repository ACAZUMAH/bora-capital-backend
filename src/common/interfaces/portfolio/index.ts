import { Types } from "mongoose";
import { HoldingsDocument } from "../holdings";

export interface PortfolioDocument {
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  name: string;
  valuation: number;
  currency: string;
  asOf: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePortfolioInput {
  userId: string | Types.ObjectId;
  name?: string;
  currency?: string;
}

export interface UpdatePortfolioInput {
  portfolioId: string | Types.ObjectId;
  name?: string;
  currency?: string;
  valuation?: number;
  asOf?: Date;
}
