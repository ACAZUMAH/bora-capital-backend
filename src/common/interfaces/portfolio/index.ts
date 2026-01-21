import { BclStatus } from '../bcl';

export interface BclPortfolio {
  PortfolioID: string;
  PortfolioName: string;
  OfferPrice: number;
}

export interface FetchPortfoliosSuccessResponse {
  Status: BclStatus[];
  Portfolios: BclPortfolio[];
}

export interface FetchPortfoliosFailureResponse {
  Response?: number;
  Message: string;
}

export type FetchPortfoliosResponse =
  | FetchPortfoliosSuccessResponse
  | FetchPortfoliosFailureResponse;
