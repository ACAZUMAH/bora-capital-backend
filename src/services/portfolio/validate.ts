import { isValidObjectId } from "mongoose";
import { CreatePortfolioInput } from "src/common/interfaces";
import createError from "http-errors";

export const validatePortfolio = async (data: CreatePortfolioInput) => {
    if (isValidObjectId(data.userId)) throw createError.BadRequest("Invalid user ID");
}