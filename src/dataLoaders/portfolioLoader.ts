import DataLoader from "dataloader";
import { portfolioModel } from "src/models";

export const CreatePortfolioLoader = () => {
    const getPortfolioById = async (ids: readonly string[]) => {
      const portfolios = await portfolioModel.find({ _id: { $in: ids } });
      return ids.map(id => portfolios.find(port => port._id.toString() === id));
    };
    return new DataLoader(getPortfolioById);
}