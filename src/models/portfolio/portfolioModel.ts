import { model, Schema } from "mongoose";
import { PortfolioDocument } from "src/common/interfaces";
import { holdingsSchema } from "../holdings/holdingsModel";
import { Collections } from "src/common/enums";

export const portfolioSchema = new Schema<PortfolioDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: Collections.Users, required: true },
    name: { type: String, default: "Main Portfolio", required: true },
    valuation: { type: Number, default: 0 },
    currency: { type: String, default: "GHS" },
    asOf: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const PortfolioModel = model<PortfolioDocument>(
  Collections.Portfolios,
  portfolioSchema
);
