import {
  QueryGetHoldingsArgs,
  QueryGetHoldingsByIdArgs,
} from 'src/common/interfaces/graphql';
import * as services from 'src/services/holdings';
import { idResolver } from '../general';
import { GraphqlContext } from 'src/common/interfaces';

const getHoldingsById = (_: any, args: QueryGetHoldingsByIdArgs) => {
  return services.getHoldingsById(args.holdingsId);
};

const getHoldings = (_: any, args: QueryGetHoldingsArgs) => {
  return services.getHoldings(args.filters);
};

const funds = (
  parent: { fundId: string },
  _: any,
  { fundsLoader }: GraphqlContext
) => {
  return parent.fundId ? fundsLoader.load(parent.fundId) : null;
};

export const holdingsResolvers = {
  Query: {
    getHoldingsById,
    getHoldings,
  },
  Holdings: {
    id: idResolver,
    funds,
  },
};
