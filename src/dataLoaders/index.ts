import { createFundLoader } from './fundsLoader';
import { createHoldingsLoader } from './holdingsLoader';
import { createTransactionLoader } from './transactionLoader';

export const createDataLoaders = () => ({
  fundsLoader: createFundLoader(),
  holdingsLoader: createHoldingsLoader(),
  transactionsLoader: createTransactionLoader(),
});
