import { Types } from 'mongoose';

export interface FundsPerformanceDocument {
  _id: string | Types.ObjectId;
  fundId: string | Types.ObjectId;
  date: Date;
  nav: number;
  returnPeriod: number;
  createdAt: Date;
  updatedAt: Date;
}
