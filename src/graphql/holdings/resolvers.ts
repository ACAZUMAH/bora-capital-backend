import { QueryGetHoldingsArgs, QueryGetHoldingsByIdArgs } from "src/common/interfaces/graphql";
import * as services from "src/services/holdings";

const getHoldingsById = (_: any, args: QueryGetHoldingsByIdArgs) => {
  return services.getHoldingsById(args.holdingsId);
};

const getHoldings = (_: any, args: QueryGetHoldingsArgs) => {
    return services.getHoldings(args.filters);
};

export const holdingsResolvers = {
  Query: {
    getHoldingsById,
    getHoldings,
  },
};
