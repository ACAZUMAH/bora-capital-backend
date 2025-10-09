import * as GraphqlTypes from "src/common/interfaces/graphql";
import * as services from "src/services/transactions";

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

export const transactionsResolvers = {
  Query: {
    getTransactionById,
  },
  Mutation: {
    createTransaction,
    updateTransaction,
  },
};
