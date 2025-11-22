import { Types } from 'mongoose';

export interface GoalsDocument {
  _id: Types.ObjectId;
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

export interface createGoalInput {
  userId: string | Types.ObjectId;
  name: string;
  type: string;
  targetAmount: number;
  targetCurrency: string;
  targetDate: Date;
}

export interface updateGoalInput {
  id: string | Types.ObjectId;
  name?: string | null;
  type?: string | null;
  targetAmount?: number | null;
  targetCurrency?: string | null;
  targetDate?: Date | null;
}

export interface getGoalsFilters {
  userId?: string | Types.ObjectId | null;
  search?: string | null;
  targetAmount?: number | null;
  targetCurrency?: string | null;
  targetDate?: Date | null;
  progress?: number | null;
  page?: number | null;
  limit?: number | null;
}
