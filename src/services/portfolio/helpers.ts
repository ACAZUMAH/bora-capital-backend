import {
  FetchPortfoliosResponse,
  FetchPortfoliosSuccessResponse,
} from 'src/common/interfaces';

export const isSuccessResponse = (
  response: FetchPortfoliosResponse
): response is FetchPortfoliosSuccessResponse => {
  return 'Status' in response && 'Portfolios' in response;
};
