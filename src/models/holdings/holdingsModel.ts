import { model, Schema } from 'mongoose';
import { Collections } from 'src/common/enums';
import { HoldingsDocument } from 'src/common/interfaces/holdings';

const holdingsSchema = new Schema<HoldingsDocument>(
  {
    fundId: {
      type: Schema.Types.ObjectId,
      ref: Collections.Funds,
      required: true,
    },
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: Collections.Portfolios,
      required: true,
    },
    // name: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    avgPurchasePrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    unrealizedPL: { type: Number, required: true },
    realizedPL: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    currency: { type: String, default: 'GHS' },
    lastPricedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

holdingsSchema.index(
  { fundId: 1, portfolioId: 1, symbol: 1 },
  { unique: true }
);

export const holdingsModel = model<HoldingsDocument>(
  Collections.Holdings,
  holdingsSchema
);
