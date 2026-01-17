/**
 * BCL Portfolio types
 */
export interface BclPortfolio {
  PortfolioID: string;
  PortfolioName: string;
  OfferPrice: number;
}

export interface FetchPortfoliosResponse {
  Status: Array<{ Status: string; Description: string }>;
  Portfolios: BclPortfolio[];
}
