import { BclPortfolio } from 'src/common/interfaces';
import { fetchPortfolioById, fetchPortfolios } from 'src/services/portfolio';

const getPortfolios = async () => {
  const portfolios = await fetchPortfolios();
  return portfolios?.map(normalizePortfolio);
};

const getPortfolioById = async (_: any, args: { portfolioId: string }) => {
  const portfolio = await fetchPortfolioById(args.portfolioId);
  return portfolio ? normalizePortfolio(portfolio) : null;
};

// Normalize BCL response to GraphQL schema
const normalizePortfolio = (p: BclPortfolio) => ({
  portfolioId: p.PortfolioID,
  portfolioName: p.PortfolioName,
  offerPrice: p.OfferPrice,
});

export const portfolioResolvers = {
  Query: {
    getPortfolios,
    getPortfolioById,
  },
};
