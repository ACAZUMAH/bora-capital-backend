import { isAuthenticated } from './general';

export const transactionsShield = {
  Query: {
    getTransactions: isAuthenticated,
  },
  Mutation: {
    depositCash: isAuthenticated,
    withdrawCash: isAuthenticated,
  },
};
