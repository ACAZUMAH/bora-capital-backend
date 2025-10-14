import { GraphqlContext } from 'src/common/interfaces';
import {
  QueryGetAssetAllocationsArgs,
  QueryGetPortfolioByIdArgs,
} from 'src/common/interfaces/graphql';
import * as services from 'src/services/portfolio';
import { idResolver } from '../general';

const getPortfolioById = (_: any, args: QueryGetPortfolioByIdArgs) => {
  return services.getPortfolioById(args.portfolioId);
};

const getPortfoliosByUserId = (_: any, { user }: GraphqlContext) => {
  return services.getPortfoliosByUserId(`${user?._id}`);
};

export const getAssetAllocations = async (
  _: any,
  args: QueryGetAssetAllocationsArgs
) => {
  return services.calculateAssetAllocations(args.portfolioId);
};

export const user = (
  parent: { userId: string },
  _: any,
  { userLoader }: GraphqlContext
) => {
  return parent.userId ? userLoader.load(parent.userId) : null;
};

export const portfolioResolvers = {
  Query: {
    getPortfolioById,
    getPortfoliosByUserId,
    getAssetAllocations,
  },
  Portfolio: {
    id: idResolver,
    user,
  },
};
