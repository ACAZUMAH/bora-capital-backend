import { createFundPerformanceLoader } from './fundPerformanceLoader';
import { createFundLoader } from './fundsLoader';
import { createHoldingsLoader } from './holdingsLoader';
import { CreatePortfolioLoader } from './portfolioLoader';
import { createTransactionLoader } from './transactionLoader';
import { createUserLoader } from './userLoader';

export const createDataLoaders = () => ({
  userLoader: createUserLoader(),
  fundsLoader: createFundLoader(),
  holdingsLoader: createHoldingsLoader(),
  transactionsLoader: createTransactionLoader(),
  portfolioLoader: CreatePortfolioLoader(),
  fundsPerformanceLoader: createFundPerformanceLoader(),
});
