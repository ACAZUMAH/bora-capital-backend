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
  name?: string;
  type?: string;
  targetAmount?: number;
  targetCurrency?: string;
  targetDate?: Date;
}
export interface getGoalsFilters {
  userId?: string | Types.ObjectId;
  search?: string | null;
  targetAmount?: number | null;
  targetCurrency?: string | null;
  targetDate?: Date | null;
  progress?: number | null;
  page?: number;
  limit?: number;
}
