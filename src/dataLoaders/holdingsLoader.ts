import DataLoader from "dataloader";
import { holdingsModel } from "src/models";

export const createHoldingsLoader = () => {
  const getHoldingsByIds = async (ids: readonly string[]) => {
    const holdings = await holdingsModel.find({ _id: { $in: ids } });
    return ids.map((id) =>
      holdings.find((holding) => holding._id.toString() === id)
    );
  };

  return new DataLoader(getHoldingsByIds);
};
