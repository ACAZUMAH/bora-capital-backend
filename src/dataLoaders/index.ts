import { createFundPerformanceLoader } from './fundPerformanceLoader';
import { createFundLoader } from './fundsLoader';
import { createHoldingsLoader } from './holdingsLoader';
import { createUserLoader } from './userLoader';

export const createDataLoaders = () => ({
  userLoader: createUserLoader(),
  fundsLoader: createFundLoader(),
  holdingsLoader: createHoldingsLoader(),
  fundsPerformanceLoader: createFundPerformanceLoader(),
});
