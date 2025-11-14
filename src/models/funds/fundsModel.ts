import { model, Schema } from 'mongoose';
import { Collections } from 'src/common/enums';
import { FundsDocument } from 'src/common/interfaces';

const fundsSchema = new Schema<FundsDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    assetClass: { type: String, required: true },
    symbol: { type: String, required: true, unique: true },
    objective: { type: String },
    inceptionDate: { type: Date, default: Date.now },
    baseCurrency: { type: String, default: 'GHS', required: true },
  },
  { timestamps: true }
);

export const fundsModel = model<FundsDocument>(Collections.Funds, fundsSchema);
