import { Types } from "mongoose";
import { HoldingsDocument } from "../holdings";

export interface PortfolioDocument {
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  name: string;
  totalValue: number;
  currency: string;
  asOf: Date;

  holdings: Array<HoldingsDocument>;

  transactions: Array<{}>;

  createdAt: Date;
  updatedAt: Date;
}
