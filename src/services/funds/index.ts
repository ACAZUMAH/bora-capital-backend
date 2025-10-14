import {
  CreateFundInput,
  FundsDocument,
  UpdateFundInput,
} from 'src/common/interfaces';
import { validateFundData } from './validate';
import { fundsModel } from 'src/models';
import { FilterQuery, isValidObjectId, Types } from 'mongoose';
import createError from 'http-errors';
import { GetFundsFilters } from 'src/common/interfaces/graphql';
import {
  getPageConnection,
  getSanitizeLimit,
  getSanitizeOffset,
  getSanitizePage,
} from 'src/common/helpers';

/**
 * @description Create a new fund
 * @param data.name - name of the fund
 * @param data.symbol - symbol of the fund
 * @param data.description - description of the fund
 * @param data.assetClass - asset class of the fund
 * @param data.objective - objective of the fund
 * @param data.inceptionDate - inception date of the fund
 * @param data.baseCurrency - base currency of the fund
 * @returns created fund object
 */
export const createFund = async (data: CreateFundInput) => {
  validateFundData(data);

  const funds = fundsModel.create({ ...data });

  return funds;
};

/**
 * @description Update fund details
 * @param data.fundId - id of the fund to update
 * @param data.name - name of the fund
 * @param data.symbol - symbol of the fund
 * @param data.description - description of the fund
 * @param data.objective - objective of the fund
 * @returns updated fund object
 */
export const updateFund = async (data: UpdateFundInput) => {
  const fund = await getFundById(data.fundId);

  const record: Record<string, any> = {
    ...(data.name && { name: data.name }),
    ...(data.symbol && { symbol: data.symbol }),
    ...(data.description && { description: data.description }),
    ...(data.objective && { objective: data.objective }),
  };

  const updatedFund = await fundsModel.findByIdAndUpdate(
    fund._id,
    { $set: record },
    { new: true }
  );

  if (!updatedFund)
    throw createError.InternalServerError('Failed to update fund');

  return updatedFund;
};

/**
 * @description Get fund by ID
 * @param id - fund id
 * @returns fund object
 */
export const getFundById = async (id: string | Types.ObjectId) => {
  if (isValidObjectId(id)) throw createError.BadRequest('Invalid fund ID');

  const fund = await fundsModel.findById(id);

  if (!fund) throw createError.NotFound('Fund not found');

  return fund;
};

/**
 * @description Get funds with optional filters
 * @param filters.limit - number of funds to return
 * @param filters.page - page number for pagination
 * @param filters.search - search term to filter
 * @returns paginated list of funds
 */
export const getFunds = async (filters: GetFundsFilters) => {
  const query: FilterQuery<FundsDocument> = {
    ...(filters.search && {
      $or: [
        { name: { $regex: filters.search, $options: 'i' } },
        { symbol: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { objective: { $regex: filters.search, $options: 'i' } },
        { assetClass: { $regex: filters.search, $options: 'i' } },
        { baseCurrency: { $regex: filters.search, $options: 'i' } },
      ],
    }),
  };

  const limit = getSanitizeLimit(filters.limit);
  const page = getSanitizePage(filters.page);
  const skip = getSanitizeOffset(limit, page);

  const funds = await fundsModel.find(query, null, {
    skip,
    limit: limit + 1,
    sort: { createdAt: -1 },
    lean: true,
  });

  return getPageConnection(funds, page, limit);
};
