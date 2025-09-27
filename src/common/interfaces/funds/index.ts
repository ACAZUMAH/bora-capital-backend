import { Types } from "mongoose";

export interface FundsDocument {
  _id: Types.ObjectId | string;
  name: string;
  symbol: string;
  description: string;
  objective: string;
  inceptionDate: Date;
  baseCurrency: string;
  createdAt: Date
  updatedAt: Date
}
