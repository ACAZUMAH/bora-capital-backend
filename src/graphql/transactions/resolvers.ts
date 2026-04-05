import { GraphqlContext } from 'src/common/interfaces';
import * as GraphqlTypes from 'src/common/interfaces/graphql';
import * as services from 'src/services/transactions';

const depositCash = (_: any, args: GraphqlTypes.MutationDepositCashArgs) => {
  return services.depositCash({ ...args.data });
};

const withdrawCash = (_: any, args: GraphqlTypes.MutationWithdrawCashArgs) => {
  return services.withdrawCash({ ...args.data });
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

const getTransactionsWithDateRanges = (
  _: any,
  args: GraphqlTypes.QueryGetTransactionsWithDateRangesArgs,
  { user }: GraphqlContext
) => {
  return services.fetchTransactionsWithDateRanges({
    userId: user?._id!,
    accountNumber: args.filters.accountNumber,
    fromDate: args.filters.fromDate,
    toDate: args.filters.toDate,
  });
};

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
