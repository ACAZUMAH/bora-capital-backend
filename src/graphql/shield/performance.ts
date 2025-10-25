import { and } from 'graphql-shield';
import { isAdmin, isAuthenticated } from './general';

export const performanceShield = {
  Query: {
    getFundPerformanceById: isAuthenticated,
    getFundPerformances: isAuthenticated,
  },
  Mutation: {
    createFundPerformances: and(isAuthenticated, isAdmin),
    updateFundPerformances: and(isAuthenticated, isAdmin),
  },
};
