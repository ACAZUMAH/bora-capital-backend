import {
  CreateHoldingsInput,
  HoldingsDocument,
  HoldingsFilters,
  UpdateHoldingsInput,
} from "src/common/interfaces";
import { validateHoldingsData } from "./validate";
import { holdingsModel } from "src/models";
import { FilterQuery, isValidObjectId, PipelineStage, Types } from "mongoose";
import createError from "http-errors";
import {
  getPageConnection,
  getSanitizeLimit,
  getSanitizeOffset,
  getSanitizePage,
} from "src/common/helpers";

/**
 * @description Create new holdings
 * @param data.fundId - ID of the fund
 * @param data.portfolioId - ID of the portfolio
 * @param data.name - Name of the holding
 * @param data.symbol - Symbol of the holding
 * @param data.quantity - Quantity of the holding
 * @param data.purchasePrice - Purchase price of the holding
 * @param data.currentPrice - Current price of the holding
 * @param data.currentValue - Current value of the holding
 * @param data.currency - Currency of the holding
 * @param data.lastPricedAt - Date when the holding was last priced
 * @returns The created holdings
 */
export const createHoldings = async (data: CreateHoldingsInput) => {
  validateHoldingsData(data);

  const holdings = await holdingsModel.create({ ...data });

  return holdings;
};

/**
 * @description Get holdings by ID
 * @param id - holdings id
 * @returns holdings object
 */
export const getHoldingsById = async (id: string | Types.ObjectId) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("Invalid holdings ID");

  const holdings = await holdingsModel.findById(id);

  if (!holdings) throw createError.NotFound("Holdings not found");

  return holdings;
};

/**
 * @description Get holdings by fund ID
 * @param fundId - fund id
 * @returns holdings object
 */
export const getHoldingsByFundId = async (
  fundId: string | Types.ObjectId
) => {
  if (!isValidObjectId(fundId)) throw createError.BadRequest("Invalid fund ID");

  const holdings = await holdingsModel.find({ fundId });

  return holdings;
};

/**
 * @description Get holdings by fund ID and portfolio ID
 * @param fundId - ID of the fund
 * @param portfolioId - ID of the portfolio
 * @returns holdings object
 */
export const getHoldingsByFundAndPortfolioIds = async (
  fundId: string | Types.ObjectId,
  portfolioId: string | Types.ObjectId
) => {
  if (!isValidObjectId(fundId)) throw createError.BadRequest("Invalid fund ID");
  if (!isValidObjectId(portfolioId))
    throw createError.BadRequest("Invalid portfolio ID");

  const holdings = await holdingsModel.findOne({ fundId, portfolioId });

  if (!holdings) throw createError.NotFound("Holdings not found");

  return holdings;
};

/**
 * @description Update holdings details
 * @param data.id - id of the holdings to update
 * @param data.name - name of the holding
 * @param data.symbol - symbol of the holding
 * @param data.quantity - quantity of the holding
 * @param data.purchasePrice - purchase price of the holding
 * @param data.currentPrice - current price of the holding
 * @param data.currentValue - current value of the holding
 * @param data.currency - currency of the holding
 * @param data.lastPricedAt - date when the holding was last priced
 * @param data.unrealizedPL - unrealized profit/loss of the holding
 * @param data.realizedPL - realized profit/loss of the holding
 * @returns updated holdings object
 */
export const updateHoldings = async (data: UpdateHoldingsInput) => {
  const holdings = await getHoldingsById(data.id);

  const updatePayload: Record<string, any> = {
    ...(data.symbol && { symbol: data.symbol }),
    ...(data.quantity && { quantity: data.quantity }),
    ...(data.avgPurchasePrice && { purchasePrice: data.avgPurchasePrice }),
    ...(data.currentPrice && { currentPrice: data.currentPrice }),
    ...(data.currentValue && { currentValue: data.currentValue }),
    ...(data.currency && { currency: data.currency }),
    ...(data.lastPricedAt && { lastPricedAt: data.lastPricedAt }),
    ...(data.unrealizedPL && { unrealizedPL: data.unrealizedPL }),
    ...(data.realizedPL && { realizedPL: data.realizedPL }),
  };

  const update = await holdingsModel.findByIdAndUpdate(
    holdings._id,
    { $set: updatePayload },
    { new: true }
  );

  if (!update)
    throw createError.InternalServerError("Failed to update holdings");

  return update;
};

/**
 * @description Get holdings with optional filters
 * @param filters.portfolioId - filter by portfolio ID
 * @param filters.fundId - filter by fund ID
 * @param filters.search - search by name (case-insensitive, partial match)
 * @param filters.page - page number for pagination (default: 1)
 * @param filters.limit - number of items per page for pagination (default: 10)
 * @returns paginated list of holdings
 */
export const getHoldings = async (filters: HoldingsFilters) => {
  const limit = getSanitizeLimit(filters.limit);
  const page = getSanitizePage(filters.page);
  const skip = getSanitizeOffset(limit, page);

  const query: FilterQuery<HoldingsDocument> = {
    ...(filters.portfolioId && { portfolioId: filters.portfolioId }),
    ...(filters.fundId && { fundId: filters.fundId }),
    ...(filters.search && { name: { $regex: filters.search, $options: "i" } }),
  };

  // const pipeline: PipelineStage[] = [
  //   { $match: query },
  //   { $sort: { createdAt: -1 } },
  //   { $skip: skip },
  //   { $limit: limit },
  // ];

  const holdings = await holdingsModel.find(query, null, {
    skip,
    limit,
    sort: { createdAt: -1 },
  });

  return getPageConnection(holdings, page, limit);
};

/**
 * @description Get holdings by portfolio ID
 * @param portfolioId - ID of the portfolio
 * @returns Array of holdings belonging to the portfolio
 */
export const getHoldingsByPortfolioId = async (
  portfolioId: string | Types.ObjectId
) => {
  if (!isValidObjectId(portfolioId))
    throw createError.BadRequest("Invalid portfolio ID");

  const holdings = await holdingsModel.find({ portfolioId }).populate("fundId");

  return holdings;
};
