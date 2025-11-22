import { model, Schema } from 'mongoose';
import { Collections } from 'src/common/enums';
import { GoalsDocument } from 'src/common/interfaces';

//@ts-ignore
const goalsSchema = new Schema<GoalsDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: Collections.Users,
      required: true,
    },
    type: { type: String, required: true },
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    targetCurrency: { type: String, default: 'GHS' },
    targetDate: { type: Date, required: true },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const goalsModels = model<GoalsDocument>(Collections.Goals, goalsSchema);
