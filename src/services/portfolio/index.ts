import {
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "src/common/interfaces";
import { validatePortfolio } from "./validate";
import { PortfolioModel } from "src/models";
import { isValidObjectId, Types } from "mongoose";
import createError from "http-errors";

/**
 * @description Create a new portfolio for a user
 * @param data.userId - ID of the user
 * @param data.name - Name of the portfolio
 * @param data.currency - Currency of the portfolio
 * @returns The created portfolio
 */
export const createPortfolio = async (data: CreatePortfolioInput) => {
  validatePortfolio(data);

  const portfolio = await PortfolioModel.create({
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

  const portfolio = await PortfolioModel.findByIdAndUpdate(
    port._id,
    { $set: record },
    { new: true }
  );

  if (!portfolio) throw createError.InternalServerError("Could not update portfolio");

    return portfolio;
};

/**
 * @description Get portfolio by ID
 * @param id - portfolio id
 * @returns portfolio object
 */
export const getPortfolioById = async (id: string | Types.ObjectId) => {
  if (isValidObjectId(id)) throw createError.BadRequest("Invalid portfolio ID");

  const portfolio = await PortfolioModel.findById(id);

  if (!portfolio) throw createError.NotFound("Portfolio not found");

  return portfolio;
};
