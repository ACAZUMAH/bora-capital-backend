import { GraphqlContext } from 'src/common/interfaces';
import * as GraphqlTypes from 'src/common/interfaces/graphql';
import * as services from 'src/services/transactions';

const depositCash = (_: any, args: GraphqlTypes.MutationDepositCashArgs) => {
  const erpReffID = services.depositCash({ ...args.data });
  return { erpReffID };
};

const withdrawCash = (_: any, args: GraphqlTypes.MutationWithdrawCashArgs) => {
  const description = services.withdrawCash({ ...args.data });
  return { description };
};

const getTransactions = (
  _: any,
  args: GraphqlTypes.QueryGetTransactionsArgs,
  { user }: GraphqlContext
) => {
  return services.fetchMiniStatement({
    userId: user?._id!,
    accountNumber: args.filters.accountNumber,
  });
};

const getTransactionsWithDateRanges = () => {};

export const transactionsResolvers = {
  Query: {
    getTransactions,
    getTransactionsWithDateRanges,
  },
  Mutation: {
    depositCash,
    withdrawCash,
  },
};
