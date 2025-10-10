import { UpdateTransactionStatusInput } from "src/common/interfaces/graphql";
import { getTransactionById } from ".";
import { getHoldingsByFundAndPortfolioIds } from "../holdings";
import { getFundById } from "../funds";
import mongoose from "mongoose";
import { TransactionStatus, TransactionType } from "src/common/enums";
import {
  FundsPerformanceModel,
  holdingsModel,
  portfolioModel,
  TransactionModel,
} from "src/models";
import createError from "http-errors";

/**
 * @description Update the status of a transaction and adjust holdings and portfolio valuation accordingly
 * @param data.id - ID of the transaction to update
 * @param data.status - New status of the transaction
 * @returns The updated transaction
 */
export const updateTransactionStatus = async (
  data: UpdateTransactionStatusInput
) => {
  const trx = await getTransactionById(data.id);
  const holding = await getHoldingsByFundAndPortfolioIds(
    trx.portfolioId,
    trx.fundId
  );
  const fund = await getFundById(trx.fundId);

  const latestPerformance = await FundsPerformanceModel.findOne({
    fundId: trx.fundId,
  })
    .sort({ date: -1 })
    .limit(1);

  const currentNav = latestPerformance?.nav || trx.amount / trx.quantity;

  const sessions = await mongoose.startSession();
  try {
    const result = await sessions.withTransaction(async () => {
      if (
        data.status === TransactionStatus.PENDING ||
        data.status === TransactionStatus.CANCELLED ||
        data.status === TransactionStatus.FAILED
      ) {
        return await TransactionModel.findByIdAndUpdate(
          trx._id,
          { $set: { paymentStatus: data.status } },
          { new: true, session: sessions }
        );
      }

      if (data.status === TransactionStatus.COMPLETED) {
        if (trx.type === TransactionType.BUY) {
          const transactionPrice = trx.amount / trx.quantity;

          if (holding) {
            // Update existing holding
            const newQuantity = holding.quantity + trx.quantity;
            const totalCost =
              holding.quantity * holding.avgPurchasePrice + trx.amount;
            const newAvgPrice = totalCost / newQuantity;
            const newCurrentValue = newQuantity * currentNav;
            const newUnrealizedPL = newCurrentValue - totalCost;

            await holdingsModel.findByIdAndUpdate(
              holding._id,
              {
                $set: {
                  quantity: newQuantity,
                  avgPurchasePrice: newAvgPrice,
                  currentPrice: currentNav,
                  currentValue: newCurrentValue,
                  unrealizedPL: newUnrealizedPL,
                  lastPricedAt: new Date(),
                },
              },
              { session: sessions }
            );
          } else {
            // Create new holding
            const currentValue = trx.quantity * currentNav;
            const unrealizedPL = currentValue - trx.amount;

            await holdingsModel.create(
              [
                {
                  fundId: trx.fundId,
                  portfolioId: trx.portfolioId,
                  symbol: fund.symbol,
                  quantity: trx.quantity,
                  avgPurchasePrice: transactionPrice,
                  currentPrice: currentNav,
                  currentValue: currentValue,
                  unrealizedPL: unrealizedPL,
                  realizedPL: 0,
                  currency: trx.currency,
                  lastPricedAt: new Date(),
                },
              ],
              { session: sessions }
            );

            // Update portfolio valuation
            await portfolioModel.findByIdAndUpdate(
              trx.portfolioId,
              {
                $inc: { valuation: trx.amount },
              },
              { session: sessions }
            );
            8;
          }
        }
        if (trx.type === TransactionType.SELL) {
          if (!holding || holding.quantity < trx.quantity)
            throw createError.BadRequest("Insufficient holdings to sell");

          const newQuantity = holding.quantity - trx.quantity;
          const costBasis = trx.quantity * holding.avgPurchasePrice;
          const realizedPL = trx.amount - costBasis;

          if (newQuantity === 0) {
            // Remove holding if all shares are sold
            await holdingsModel.findByIdAndDelete(holding._id, {
              session: sessions,
            });
          } else {
            // Update holding with reduced quantity
            const newCurrentValue = newQuantity * currentNav;
            const newUnrealizedPL =
              newCurrentValue - newQuantity * holding.avgPurchasePrice;

            await holdingsModel.findByIdAndUpdate(
              holding._id,
              {
                $set: {
                  quantity: newQuantity,
                  currentPrice: currentNav,
                  currentValue: newCurrentValue,
                  unrealizedPL: newUnrealizedPL,
                  realizedPL: holding.realizedPL + realizedPL,
                  lastPricedAt: new Date(),
                },
                $inc: { realizedPL: realizedPL },
              },
              { session: sessions }
            );

            // Update portfolio valuation
            await portfolioModel.findByIdAndUpdate(
              trx.portfolioId,
              {
                $inc: { valuation: -costBasis },
              },
              { session: sessions }
            );
          }
        }

        if (trx.type === TransactionType.DEPOSIT) {
          // Update portfolio valuation
          await portfolioModel.findByIdAndUpdate(
            trx.portfolioId,
            {
              $inc: { valuation: trx.amount },
              $set: { asOf: new Date() },
            },
            { session: sessions }
          );
        }

        if (trx.type === TransactionType.WITHDRAWAL) {
          // Update portfolio valuation
          await portfolioModel.findByIdAndUpdate(
            trx.portfolioId,
            {
              $inc: { valuation: -trx.amount },
              $set: { asOf: new Date() },
            },
            { session: sessions }
          );
        }

        if (trx.type === TransactionType.TRANSFER) {
          // update timestamp
          await portfolioModel.findByIdAndUpdate(
            trx.portfolioId,
            {
              $set: { asOf: new Date() },
            },
            { session: sessions }
          );
        }

        return await TransactionModel.findByIdAndUpdate(
          trx._id,
          { $set: { paymentStatus: data.status } },
          { new: true, session: sessions }
        );
      }
    });

    return result;
  } catch (error) {
    throw createError.InternalServerError(
      "Transaction failed, please try again"
    );
  } finally {
    await sessions.endSession();
  }
};
 