import {
  CreateTransactionInput,
  TransactionsDocument,
  TransactionsFilters,
} from 'src/common/interfaces';
import { TransactionModel } from 'src/models';
import { getUserById } from '../users';
import { getFundById } from '../funds';
import { getPortfolioById } from '../portfolio';
import { FilterQuery, isValidObjectId, Types } from 'mongoose';
import createError from 'http-errors';
import {
  getPageConnection,
  getSanitizeLimit,
  getSanitizeOffset,
  getSanitizePage,
} from 'src/common/helpers';
import { UpdateTransactionInput } from 'src/common/interfaces/graphql';
import {
  validateCreateTransactionData,
  validateUpdateTransactionData,
} from './validate';
import { startOfDay } from 'date-fns';
import { endOfDay } from 'date-fns';

/**
 * @description Create a new transaction
 * @param data.userId - ID of the user
 * @param data.fundId - ID of the fund
 * @param data.portfolioId - ID of the portfolio
 * @param data.type - Type of the transaction
 * @param data.amount - Amount of the transaction
 * @param data.currency - Currency of the transaction
 * @param data.quantity - Quantity of the transaction
 * @param data.providerId - (Optional) ID of the provider
 * @param data.bankAccountId - (Optional) ID of the bank account
 * @param data.reference - (Optional) Reference for the transaction
 * @param data.description - (Optional) Description of the transaction
 * @param data.paymentStatus - (Optional) Status of the transaction
 * @param data.paymentMethod - (Optional) Payment method of the transaction
 * @param data.transactionDate - (Optional) Date of the transaction
 * @returns The created transaction
 */
export const createTransaction = async (data: CreateTransactionInput) => {
  validateCreateTransactionData(data);

  const user = await getUserById(data.userId);

  const fund = await getFundById(data.fundId);

  const portfolio = await getPortfolioById(data.portfolioId);

  const transaction = await TransactionModel.create({
    ...data,
    userId: user._id,
    fundId: fund._id,
    portfolioId: portfolio._id,
  });

  return transaction;
};

/**
 * @description Get transaction by ID
 * @param id - ID of the transaction to retrieve
 * @returns The transaction with the specified ID
 */
export const getTransactionById = async (id: string | Types.ObjectId) => {
  if (isValidObjectId(id))
    throw createError.BadRequest('Invalid transaction ID');

  const transaction = await TransactionModel.findById(id, null, { lean: true });

  if (!transaction) throw createError.NotFound('Transaction not found');

  return transaction;
};

/**
 * @description Update a transaction
 * @param data.id - ID of the transaction to update
 * @param data.type - (Optional) Updated type of the transaction
 * @param data.amount - (Optional) Updated amount of the transaction
 * @param data.currency - (Optional) Updated currency of the transaction
 * @param data.quantity - (Optional) Updated quantity of the transaction
 * @param data.providerId - (Optional) Updated ID of the provider
 * @param data.bankAccountId - (Optional) Updated ID of the bank account
 * @param data.reference - (Optional) Updated reference for the transaction
 * @param data.description - (Optional) Updated description of the transaction
 * @param data.paymentStatus - (Optional) Updated status of the transaction
 * @param data.paymentMethod - (Optional) Updated payment method of the transaction
 * @param data.transactionDate - (Optional) Updated date of the transaction
 * @returns The updated transaction
 */
export const updateTransaction = async (data: UpdateTransactionInput) => {
  validateUpdateTransactionData(data);

  const updateRecord: Record<string, any> = {
    ...(data.type && { type: data.type }),
    ...(data.amount && { amount: data.amount }),
    ...(data.currency && { currency: data.currency }),
    ...(data.quantity && { quantity: data.quantity }),
    ...(data.providerId && { providerId: data.providerId }),
    ...(data.bankAccountId && { bankAccountId: data.bankAccountId }),
    ...(data.reference && { reference: data.reference }),
    ...(data.description && { description: data.description }),
    ...(data.paymentMethod && { paymentMethod: data.paymentMethod }),
    ...(data.transactionDate && { transactionDate: data.transactionDate }),
  };

  return await TransactionModel.findByIdAndUpdate(
    data.id,
    {
      $set: updateRecord,
    },
    { new: true, lean: true }
  );
};

/**
 * @description Get transactions based on filters
 * @param filters.limit - (Optional) Number of transactions to return
 * @param filters.page - (Optional) Page number for pagination
 * @param filters.userId - (Optional) Filter by user ID
 * @param filters.fundId - (Optional) Filter by fund ID
 * @param filters.portfolioId - (Optional) Filter by portfolio ID
 * @param filters.providerId - (Optional) Filter by provider ID
 */
export const getTransactions = async (filters: TransactionsFilters) => {
  const query: FilterQuery<TransactionsDocument> = {
    ...(filters.userId &&
      isValidObjectId(filters.userId) && { userId: filters.userId }),
    ...(filters.fundId &&
      isValidObjectId(filters.fundId) && { fundId: filters.fundId }),
    ...(filters.portfolioId &&
      isValidObjectId(filters.portfolioId) && {
        portfolioId: filters.portfolioId,
      }),
    ...(filters.providerId && { providerId: filters.providerId }),
    ...(filters.type && { type: filters.type }),
    ...(filters.status && { status: filters.status }),
    ...(filters.search && {
      $or: [
        { type: { $regex: filters.search, $options: 'i' } },
        { reference: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { status: { $regex: filters.search, $options: 'i' } },
      ],
    }),
    ...(filters.startDate &&
      filters.endDate && {
        transactionDate: {
          $gte: startOfDay(filters.startDate),
          $lte: endOfDay(filters.endDate),
        },
      }),
  };

  const limit = getSanitizeLimit(filters.limit);
  const page = getSanitizePage(filters.page);
  const skip = getSanitizeOffset(limit, page);

  const transactions = await TransactionModel.find(query, null, {
    skip,
    limit,
    sort: { createdAt: -1 },
    lean: true,
  });

  return getPageConnection(transactions, page, limit);
};
