import { isAuthenticated } from './general';

export const transactionsShield = {
  Query: {
    getTransactionById: isAuthenticated,
    getTransactions: isAuthenticated,
  },
  Mutation: {
    createTransaction: isAuthenticated,
    updateTransaction: isAuthenticated,
    updateTransactionStatus: isAuthenticated,
  },
};
