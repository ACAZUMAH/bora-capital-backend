import {
  createGoalInput,
  getGoalsFilters,
  updateGoalInput,
} from 'src/common/interfaces';
import { validateCreateGoalData } from './validation/validateCreateGoalData';
import { getUserById } from '../users';
import { goalsModels } from 'src/models/goals/goalsModel';
import { isValidObjectId } from 'mongoose';
import { FilterQuery, Types } from 'mongoose';
import createError from 'http-errors';
import {
  getPageConnection,
  getSanitizeLimit,
  getSanitizeOffset,
  getSanitizePage,
} from 'src/common/helpers';
import { GoalsDocument } from 'src/common/interfaces';

/**
 * @description Creates a new goal for a user.
 * @param data.userId - The ID of the user to create the goal for.
 * @param data.name - The name of the goal.
 * @param data.type - The type of the goal.
 * @param data.targetAmount - The target amount for the goal.
 * @param data.targetCurrency - The target currency for the goal.
 * @param data.targetDate - The target date for the goal.
 * @returns The created goal.
 */
export const createGoal = async (data: createGoalInput) => {
  validateCreateGoalData(data);

  const user = await getUserById(data.userId);

  const goal = await goalsModels.create({
    userId: user._id,
    name: data.name,
    type: data.type,
    targetAmount: data.targetAmount,
    targetCurrency: data.targetCurrency,
    targetDate: data.targetDate,
  });

  return goal;
};

/**
 * @description Gets a goal by ID.
 * @param goalId - The ID of the goal to get.
 * @returns The goal.
 */
export const getGoalById = async (goalId: string | Types.ObjectId) => {
  if (!isValidObjectId(goalId)) throw createError(400, 'Invalid goal ID');

  const goal = await goalsModels.findById(goalId);

  if (!goal) throw createError(404, 'Goal not found');

  return goal;
};

/**
 * @description Gets goals by filters.
 * @param filters.userId - The ID of the user to get goals for.
 * @param filters.search - The search query to filter goals by.
 * @param filters.targetAmount - The target amount to filter goals by.
 * @param filters.targetCurrency - The target currency to filter goals by.
 * @param filters.targetDate - The target date to filter goals by.
 * @param filters.progress - The progress to filter goals by.
 * @param filters.page - The page number to get goals for.
 * @param filters.limit - The number of goals to get per page.
 * @returns The goals.
 */
export const getGoals = async (filters: getGoalsFilters) => {
  const limit = getSanitizeLimit(filters.limit);
  const page = getSanitizePage(filters.page);
  const skip = getSanitizeOffset(limit, page);

  const query: FilterQuery<GoalsDocument> = {
    ...(filters.userId && { userId: filters.userId }),
    ...(filters.search && { name: { $regex: filters.search, $options: 'i' } }),
    ...(filters.targetAmount && { targetAmount: filters.targetAmount }),
    ...(filters.targetCurrency && { targetCurrency: filters.targetCurrency }),
    ...(filters.targetDate && { targetDate: filters.targetDate }),
    ...(filters.progress && { progress: filters.progress }),

    ...(filters.search && {
      $or: [
        { name: { $regex: filters.search, $options: 'i' } },
        { type: { $regex: filters.search, $options: 'i' } },
        { targetCurrency: { $regex: filters.search, $options: 'i' } },
        { targetDate: { $regex: filters.search, $options: 'i' } },
        { progress: { $regex: filters.search, $options: 'i' } },
      ],
    }),
  };

  const goals = await goalsModels.find(query, null, {
    skip,
    limit,
    sort: { createdAt: -1 },
  });

  return getPageConnection(goals, page, limit);
};

/**
 * @description Updates a goal.
 * @param data.id - The ID of the goal to update.
 * @param data.name - The name of the goal to update.
 * @param data.type - The type of the goal to update.
 * @param data.targetAmount - The target amount of the goal to update.
 * @param data.targetCurrency - The target currency of the goal to update.
 * @param data.targetDate - The target date of the goal to update.
 * @returns The updated goal.
 */
export const updateGoal = async (data: updateGoalInput) => {
  const goal = await getGoalById(data.id);

  const updatePayload: Record<string, any> = {
    ...(data.name && { name: data.name }),
    ...(data.type && { type: data.type }),
    ...(data.targetAmount && { targetAmount: data.targetAmount }),
    ...(data.targetCurrency && { targetCurrency: data.targetCurrency }),
    ...(data.targetDate && { targetDate: data.targetDate }),
  };

  const update = await goalsModels.findByIdAndUpdate(
    goal._id,
    { $set: updatePayload },
    { new: true }
  );

  if (!update) throw createError(500, 'Failed to update goal');

  return update;
};
