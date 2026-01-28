import { fetchPortfolioById, fetchPortfolios } from 'src/services/portfolio';

const getPortfolios = async () => {
  return await fetchPortfolios();
};

const getPortfolioById = async (_: any, args: { portfolioId: string }) => {
  return await fetchPortfolioById(args.portfolioId);
};

export const portfolioResolvers = {
  Query: {
    getPortfolios,
    getPortfolioById,
  },
};
