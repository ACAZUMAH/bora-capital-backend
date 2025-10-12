import { Types } from 'mongoose';

export interface GoalsDocument {
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  name: string;
  type: string;
  targetAmount: number;
  currentAmount: number;
  targetCurrency: string;
  progress: number;
  targetDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
