import { MutationCreateFundPerformancesArgs, MutationUpdateFundPerformancesArgs, QueryGetFundPerformanceByIdArgs, QueryGetFundPerformancesArgs } from 'src/common/interfaces/graphql';
import { idResolver } from 'src/graphql/general';
import { createFundsPerformance, getFundPerformancesById, getFundsPerformance, updateFundPerformance } from 'src/services/funds/performance';

const getFundPerformances = (_: any, args: QueryGetFundPerformancesArgs) => {
  return getFundsPerformance(args.filters!);
};

const getFundPerformanceById = (
  _: any, args: QueryGetFundPerformanceByIdArgs
) => {
  return getFundPerformancesById(args.id);
};

const createFundPerformances = (_: any, args: MutationCreateFundPerformancesArgs) => {
  return createFundsPerformance(args.data);
};

const updateFundPerformances = (_: any, args: MutationUpdateFundPerformancesArgs) => {
  return updateFundPerformance(args.data);
};

export const fundsPerformanceResolvers = {
  Query: {
    getFundPerformanceById,
    getFundPerformances,
  },

  FundsPerformance: {
    id: idResolver,
  },
 
  Mutation: {
    createFundPerformances,
    updateFundPerformances,
  },
};
