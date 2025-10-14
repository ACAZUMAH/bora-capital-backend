import { Types } from 'mongoose';

export interface FundsPerformanceDocument {
  _id: Types.ObjectId;
  fundId: string | Types.ObjectId;
  date: Date;
  nav: number;
  returnPeriod: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFundsPerformanceInput {
  fundId: string | Types.ObjectId;
  date: Date;
  nav: number;
  returnPeriod: number;
}

export interface UpdateFundsPerformanceInput {
  performanceId: string | Types.ObjectId;
  date?: Date | null;
  nav?: number | null;
  returnPeriod?: number | null;
}

export interface FundsPerformanceFilter {
  limit?: number | null;
  page?: number | null;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc' | null;
  fundId?: string | Types.ObjectId | null;
  startDate?: Date | null;
  endDate?: Date | null;
}