import { isAuthenticated } from './general';

export const portfolioAccountShield = {
  Query: {
    getMyPortfolioAccounts: isAuthenticated,
    getMyPortfolioAccountsWithNav: isAuthenticated,
    getMyPortfolioAccount: isAuthenticated,
  },
  Mutation: {
    createPortfolioAccount: isAuthenticated,
  },
};
