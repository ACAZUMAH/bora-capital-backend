import { createUserLoader } from './userLoader';

export const createDataLoaders = () => ({
  userLoader: createUserLoader(),
});
