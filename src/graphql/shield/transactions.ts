import { isAuthenticated } from './general';

export const transactionsShield = {
  Query: {
    getTransactions: isAuthenticated,
    getTransactionById: isAuthenticated,
    getTransactionsWithDateRanges: isAuthenticated,
  },
  Mutation: {
    depositCash: isAuthenticated,
    withdrawCash: isAuthenticated,
  },
};
