import * as GraphqlTypes from 'src/common/interfaces/graphql';
import * as Services from 'src/services/funds';
import { idResolver } from '../general';
import { fundsPerformanceResolvers } from './performance/resolvers';

const createFund = (_: any, args: GraphqlTypes.MutationCreateFundArgs) => {
  return Services.createFund(args.data);
};

const updateFund = (_: any, args: GraphqlTypes.MutationUpdateFundArgs) => {
  return Services.updateFund(args.data);
};

const getFundById = (_: any, args: GraphqlTypes.QueryGetFundByIdArgs) => {
  return Services.getFundById(args.fundId);
};

const getFunds = (_: any, args: GraphqlTypes.QueryGetFundsArgs) => {
  return Services.getFunds(args.filters);
};

const deleteFund = () => {};

export const fundsResolvers = {
  Query: {
    ...fundsPerformanceResolvers.Query,
    getFundById,
    getFunds,
  },
  Fund: {
    id: idResolver,
  },
  Mutation: {
    ...fundsPerformanceResolvers.Mutation,
    createFund,
    updateFund,
    deleteFund,
  },
  FundPerformance: {
    ...fundsPerformanceResolvers.FundPerformance,
  }
};
