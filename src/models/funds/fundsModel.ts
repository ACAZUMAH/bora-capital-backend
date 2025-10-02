import { model, Schema } from "mongoose";
import { Collections } from "src/common/enums";
import { FundsDocument } from "src/common/interfaces";

const fundsSchema = new Schema<FundsDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    symbol: { type: String, required: true, unique: true },
    objective: { type: String },
    inceptionDate: { type: Date },
    baseCurrency: { type: String, required: true },
  },
  { timestamps: true }
);

export const FundsModel = model<FundsDocument>(Collections.Funds, fundsSchema);
