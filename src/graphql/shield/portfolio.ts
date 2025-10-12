import { isAuthenticated } from './general';

export const portfolioShield = {
  Query: {
    getPortfolioById: isAuthenticated,
    getPortfoliosByUserId: isAuthenticated,
    getAssetAllocations: isAuthenticated,
  },
  Mutation: {},
};
