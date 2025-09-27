import { Schema } from "mongoose";
import { PortfolioDocument } from "src/common/interfaces";
import { holdingsSchema } from "../holdings/holdingsModel";

export const portfolioSchema = new Schema<PortfolioDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    totalValue: { type: Number, default: 0 },
    currency: { type: String, default: "GHS" },
    asOf: { type: Date, default: Date.now },

    holdings: { type: [holdingsSchema], default: [] },
  },
  { timestamps: true }
);
