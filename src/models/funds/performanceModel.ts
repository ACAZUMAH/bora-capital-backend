import { Schema, model } from "mongoose";
import { Collections } from "src/common/enums";
import { FundsPerformanceDocument } from "src/common/interfaces/funds/fundsPerformance";

const fundsPerformanceSchema = new Schema<FundsPerformanceDocument>(
  {
    fundId: {
      type: Schema.Types.ObjectId,
      ref: Collections.Funds,
      required: true,
    },
    date: { type: Date, required: true },
    nav: { type: Number, required: true },
    returnPeriod: { type: Number, required: true },
  },
  { timestamps: true }
);

export const FundsPerformanceModel = model<FundsPerformanceDocument>(
  Collections.FundsPerformance,
  fundsPerformanceSchema
);
