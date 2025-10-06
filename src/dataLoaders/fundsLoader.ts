import DataLoader from "dataloader";
import { fundsModel } from "src/models";

export const createFundLoader = () => {
  const getFundsByIds = async (ids: readonly string[]) => {
    const funds = await fundsModel.find({ _id: { $in: ids } });
    return ids.map((id) => funds.find((fund) => fund._id.toString() === id));
  };

  return new DataLoader(getFundsByIds);
};
