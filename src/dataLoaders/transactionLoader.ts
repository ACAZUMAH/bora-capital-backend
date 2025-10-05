import DataLoader from "dataloader";
import { TransactionModel } from "src/models";

export const createTransactionLoader = () => {
  const getTransactionsByIds = async (ids: readonly string[]) => {
    const transactions = await TransactionModel.find({ _id: { $in: ids } });
    return ids.map((id) => transactions.find((tx) => tx._id.toString() === id));
  };
  return new DataLoader(getTransactionsByIds);
};
