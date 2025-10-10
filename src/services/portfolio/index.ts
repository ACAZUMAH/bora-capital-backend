import {
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "src/common/interfaces";
import { validatePortfolio } from "./validate";
import { portfolioModel } from "src/models";
import { isValidObjectId, Types } from "mongoose";
import createError from "http-errors";
import { getHoldingsByPortfolioId } from "../holdings";

/**
 * @description Create a new portfolio for a user
 * @param data.userId - ID of the user
 * @param data.name - Name of the portfolio
 * @param data.currency - Currency of the portfolio
 * @returns The created portfolio
 */
export const createPortfolio = async (data: CreatePortfolioInput) => {
  validatePortfolio(data);

  const portfolio = await portfolioModel.create({
    ...data,
  });

  return portfolio;
};

/**
 * @description Update an existing portfolio
 * @param data.portfolioId - ID of the portfolio to update
 * @param data.name - New name of the portfolio
 * @param data.currency - New currency of the portfolio
 * @param data.valuation - New valuation of the portfolio
 * @param data.asOf - New date for the valuation
 * @returns The updated portfolio
 */
export const UpdatePortfolio = async (data: UpdatePortfolioInput) => {
  const port = await getPortfolioById(data.portfolioId);

  const record: Record<string, any> = {};

  if (data.name) record.name = data.name;
  if (data.currency) record.currency = data.currency;
  if (data.valuation) record.valuation = data.valuation;
  if (data.asOf) record.asOf = data.asOf;

  const portfolio = await portfolioModel.findByIdAndUpdate(
    port._id,
    { $set: record },
    { new: true }
  );

  if (!portfolio)
    throw createError.InternalServerError("Could not update portfolio");

  return portfolio;
};

/**
 * @description Get portfolio by ID
 * @param id - portfolio id
 * @returns portfolio object
 */
export const getPortfolioById = async (id: string | Types.ObjectId) => {
  if (isValidObjectId(id)) throw createError.BadRequest("Invalid portfolio ID");

  const portfolio = await portfolioModel.findById(id);

  if (!portfolio) throw createError.NotFound("Portfolio not found");

  return portfolio;
};

/**
 * @description Get portfolios by user ID
 * @param userId - ID of the user
 * @returns Array of portfolios belonging to the user
 */
export const getPortfoliosByUserId = async (
  userId: string | Types.ObjectId
) => {
  if (isValidObjectId(userId)) throw createError.BadRequest("Invalid user ID");

  const portfolios = await portfolioModel.find({ userId });

  return portfolios;
};

/**
 * @description Calculate asset allocations for a given portfolio
 * @param portfolioId - ID of the portfolio
 * @returns Array of asset allocations with asset class, total value, and percentage
 */
export const calculateAssetAllocations = async (
  portfolioId: string | Types.ObjectId
) => {
  if (!isValidObjectId(portfolioId))
    throw createError.BadRequest("Invalid portfolio ID");

  const holdings = await getHoldingsByPortfolioId(portfolioId);

  const allocations: Record<string, number> = {};

  let totalValue = 0;

  for (const holding of holdings) {
    const value = holding.currentPrice || 0;
    totalValue += value;

    // fundId can be a string/object id or a populated object with assetClass.
    // Narrow the union at runtime before accessing assetClass.
    const fund = holding.fundId as any;
    const assetClass =
      fund && typeof fund === "object" && "assetClass" in fund
        ? (fund.assetClass as string)
        : "Unclassified";

    allocations[assetClass] = (allocations[assetClass] || 0) + value;
  }

  return Object.keys(allocations).map((assetClass) => ({
    assetClass: assetClass,
    totalValue: allocations[assetClass],
    percentage: totalValue ? (allocations[assetClass] / totalValue) * 100 : 0,
  }));
};
