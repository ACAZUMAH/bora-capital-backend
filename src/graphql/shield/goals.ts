import { GraphqlContext } from 'src/common/interfaces';
import { isAuthenticated } from './general';
import { and, rule } from 'graphql-shield';

const canUpdateGoal = rule()((_: any, args: any, { user }: GraphqlContext) => {
  return args.data.userId === user?._id;
});

export const goalsShield = {
  Query: {
    getGoals: isAuthenticated,
    getGoalById: isAuthenticated,
  },
  Mutation: {
    createGoal: isAuthenticated,
    updateGoal: and(isAuthenticated, canUpdateGoal),
  },
};
