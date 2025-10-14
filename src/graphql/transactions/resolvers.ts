import * as GraphqlTypes from 'src/common/interfaces/graphql';
import * as services from 'src/services/transactions';
import { idResolver } from '../general';
import { GraphqlContext } from 'src/common/interfaces';
import * as status from 'src/services/transactions/updateStatus';

const getTransactions = (_: any, args: GraphqlTypes.QueryGetTransactionsArgs) => {
  return services.getTransactions({ ...args.filters });
};

const createTransaction = (
  _: any,
  args: GraphqlTypes.MutationCreateTransactionArgs
) => {
  return services.createTransaction({ ...args.data });
};

const getTransactionById = (
  _: any,
  args: GraphqlTypes.QueryGetTransactionByIdArgs
) => {
  return services.getTransactionById(args.id);
};

const updateTransaction = (
  _: any,
  args: GraphqlTypes.MutationUpdateTransactionArgs
) => {
  return services.updateTransaction({ ...args.data });
};

const updateTransactionStatus = (
  _: any,
  args: GraphqlTypes.MutationUpdateTransactionStatusArgs
) => {
  return status.updateTransactionStatus({ ...args.data });
};

export const funds = (
  parent: { fundId: string },
  _: any,
  { fundsLoader }: GraphqlContext
) => {
  return parent.fundId ? fundsLoader.load(parent.fundId) : null;
};

export const portfolio = (
  parent: { portfolioId: string },
  _: any,
  { portfolioLoader }: GraphqlContext
) => {
  return parent.portfolioId ? portfolioLoader.load(parent.portfolioId) : null;
};

export const transactionsResolvers = {
  Query: {
    getTransactions,
    getTransactionById,
  },

  Transaction: {
    id: idResolver,
    funds,
    portfolio,
  },

  Mutation: {
    createTransaction,
    updateTransaction,
    updateTransactionStatus,
  },
};
