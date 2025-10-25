import { isAuthenticated } from './general';

export const holdingsShield = {
  Query: {
    getHoldingsById: isAuthenticated,
    getHoldings: isAuthenticated,
  },
  Mutation: {},
};
