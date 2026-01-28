import {
  BclPortfolio,
  FetchPortfoliosResponse,
  FetchPortfoliosSuccessResponse,
} from 'src/common/interfaces';

export const isSuccessResponse = (
  response: FetchPortfoliosResponse
): response is FetchPortfoliosSuccessResponse => {
  return 'Status' in response && 'Portfolios' in response;
};

export const normalizePortfolio = (p: BclPortfolio) => ({
  portfolioId: p.PortfolioID,
  portfolioName: p.PortfolioName,
  offerPrice: p.OfferPrice,
});
