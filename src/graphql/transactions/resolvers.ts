import * as GraphqlTypes from 'src/common/interfaces/graphql';
import * as services from 'src/services/transactions';

const getTransactions = () => {};

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

const updateTransactionStatus = () => {};

export const transactionsResolvers = {
  Query: {
    getTransactions,
    getTransactionById,
  },
  Mutation: {
    createTransaction,
    updateTransaction,
    updateTransactionStatus,
  },
};
