import {
  MutationCreateGoalArgs,
  MutationUpdateGoalArgs,
  QueryGetGoalByIdArgs,
  QueryGetGoalsArgs,
} from 'src/common/interfaces/graphql';
import * as services from 'src/services/goals';
import { idResolver } from '../general';
import { GraphqlContext } from 'src/common/interfaces';

const getGoals = (_: any, args: QueryGetGoalsArgs) => {
  return services.getGoals(args.filters || {});
};

const getGoalById = (_: any, args: QueryGetGoalByIdArgs) => {
  return services.getGoalById(args.id);
};

const createGoal = (_: any, args: MutationCreateGoalArgs) => {
  return services.createGoal(args.data);
};

const updateGoal = (_: any, args: MutationUpdateGoalArgs) => {
  return services.updateGoal(args.data);
};

const user = (
  parent: { userId: string },
  _: any,
  { userLoader }: GraphqlContext
) => {
  return parent.userId ? userLoader.load(parent.userId) : null;
};

export const goalsResolvers = {
  Query: {
    getGoals,
    getGoalById,
  },
  Mutation: {
    createGoal,
    updateGoal,
  },
  Goal: {
    id: idResolver,
    user,
  },
};
