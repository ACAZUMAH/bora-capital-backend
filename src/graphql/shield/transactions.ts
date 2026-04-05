import { isAuthenticated } from './general';

export const transactionsShield = {
  Query: {
    getTransactions: isAuthenticated,
    getTransactionsWithDateRanges: isAuthenticated,
  },
  Mutation: {
    depositCash: isAuthenticated,
    withdrawCash: isAuthenticated,
  },
};
