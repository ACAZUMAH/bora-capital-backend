import { Schema } from "mongoose";
import { HoldingsDocument } from "src/common/interfaces/holdings";

export const holdingsSchema = new Schema<HoldingsDocument>(
  {
    fundId: { type: Schema.Types.ObjectId, ref: "Funds", required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    unrealizedGainLoss: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    currency: { type: String, default: "GHS" },
    lastPricedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
