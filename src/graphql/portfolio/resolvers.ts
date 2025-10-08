import { GraphqlContext } from "src/common/interfaces";
import { QueryGetAssetAllocationsArgs, QueryGetPortfolioByIdArgs } from "src/common/interfaces/graphql";
import * as services from "src/services/portfolio";

const getPortfolioById = (_: any, args: QueryGetPortfolioByIdArgs) => {
    return services.getPortfolioById(args.portfolioId);
};

const getPortfoliosByUserId = (_: any, { user }: GraphqlContext) => {
    return services.getPortfoliosByUserId(`${user?._id}`);
};

export const getAssetAllocations = async (_: any, args: QueryGetAssetAllocationsArgs) => {
    return services.calculateAssetAllocations(args.portfolioId);
}

export const portfolioResolvers = {
  Query: {
    getPortfolioById,
    getPortfoliosByUserId,
    getAssetAllocations,
  },
};
