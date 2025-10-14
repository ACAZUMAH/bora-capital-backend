import * as GraphqlTypes from 'src/common/interfaces/graphql';
import * as Services from 'src/services/funds';
import { idResolver } from '../general';

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

export const fundsResolvers = {
  Query: {
    getFundById,
    getFunds,
  },
  Funds: {
    id: idResolver,
  },
  Mutation: {
    createFund,
    updateFund,
  },
};
