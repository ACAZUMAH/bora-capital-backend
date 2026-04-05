import { isAuthenticated } from './general';

export const newsShield = {
  Query: {
    getMarketNews: isAuthenticated,
    getMarketNewsById: isAuthenticated,
  },
};
