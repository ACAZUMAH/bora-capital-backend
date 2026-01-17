import { isAuthenticated } from './general';

export const portfolioShield = {
  Query: {
    getPortfolios: isAuthenticated,
    getPortfolioById: isAuthenticated,
  },
  Mutation: {},
};
