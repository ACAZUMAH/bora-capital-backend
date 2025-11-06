import DataLoader from "dataloader";
import { FundsPerformanceModel } from "src/models";

export const createFundPerformanceLoader = () => {
    const getFundPerformancesByIds = async (ids: readonly string[]) => {
        const fundPerformances = await FundsPerformanceModel.find({ _id: { $in: ids } });
        return ids.map(id => fundPerformances.find(fp => fp._id.toString() === id));
    };

    return new DataLoader(getFundPerformancesByIds);
};
