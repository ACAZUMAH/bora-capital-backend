import { FilterQuery, isValidObjectId, QueryOptions, Types } from 'mongoose';
import { CreateMarketNews, MarketNewsDocument } from 'src/common/interfaces';
import { MarketNewsModel } from 'src/models/news';
import createError from 'http-errors';
import * as GqlTypes from 'src/common/interfaces/graphql';
import {
  getPageConnection,
  getSanitizeLimit,
  getSanitizeOffset,
  getSanitizePage,
} from 'src/common/helpers';

/**
 * @description Create Market News
 * @param data.title title of the news
 * @param data.source source of the news
 * @param data.url url of the news
 * @param data.summary summary of the news
 * @param data.content content of the news
 * @param data.author author of the news
 * @param data.publishedAt published date of the news
 * @param data.tag tag of the news
 * @returns
 */
export const createMarketNews = async (data: CreateMarketNews) => {
  return await MarketNewsModel.create({
    ...data,
  });
};

/**
 * @description Find Market News by ID
 * @param id Market News ID
 * @returns Market News Document
 */
export const findMarketNewsById = async (id: Types.ObjectId) => {
  if (!isValidObjectId(id))
    throw createError.BadRequest('Invalid Market News ID');

  const news = await MarketNewsModel.findById(id);
  if (!news) throw createError.NotFound('Market News not found');

  return news;
};

/**
 * @description
 * @param filters.limit
 * @param filters.page
 * @param filters.tag
 * @param filters.search
 * @returns
 */
export const getMarketNews = async (filters: GqlTypes.MarketNewsFilters) => {
  const query: FilterQuery<MarketNewsDocument> = {
    ...(filters.tag && { tag: filters.tag }),
    ...(filters.search && {
      $or: [
        { source: { $regex: filters.search, $options: 'i' } },
        { title: { $regex: filters.search, $options: 'i' } },
        { summary: { $regex: filters.search, $options: 'i' } },
        { content: { $regex: filters.search, $options: 'i' } },
      ],
    }),
  };

  const limit = getSanitizeLimit(filters.limit);
  const page = getSanitizePage(filters.page);
  const skip = getSanitizeOffset(limit, page);

  const queryOptions: QueryOptions = {
    skip,
    limit: limit + 1,
    sort: { createAt: -1 },
    lean: true,
  };

  const result = await MarketNewsModel.find(query, null, queryOptions);

  return getPageConnection(result, page, limit);
};
