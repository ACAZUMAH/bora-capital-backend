import { isAuthenticated } from './general';

export const fundsShield = {
  Query: {
    getHoldingsById: isAuthenticated,
    getHoldings: isAuthenticated,
  },
  Mutation: {},
};
