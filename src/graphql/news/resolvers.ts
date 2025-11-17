import { QueryGetMarketNewsArgs } from 'src/common/interfaces/graphql';
import * as services from 'src/services/insights-news';
import { idResolver } from '../general';

const getMarketNews = (_: any, args: QueryGetMarketNewsArgs) => {
  return services.getMarketNews(args.filters!);
};

const getMarketNewsById = (_: any, args: any) => {
   return services.findMarketNewsById(args.id)
}

export const marketNewsResolvers = {
  Query: {
    getMarketNews,
    getMarketNewsById
  },
  MarketNews: {
    id: idResolver
  }
};
