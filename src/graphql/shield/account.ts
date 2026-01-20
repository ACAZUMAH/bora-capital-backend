import { isAuthenticated } from './general';

export const accountShield = {
  Query: {
    getMyAccounts: isAuthenticated,
    getAccount: isAuthenticated,
  },
  Mutation: {
    createAccount: isAuthenticated,
  },
};
