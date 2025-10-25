import { FilterQuery, isValidObjectId, QueryOptions, Types } from 'mongoose';
import {
  CreateFundsPerformanceInput,
  FundsPerformanceDocument,
  FundsPerformanceFilter,
  UpdateFundsPerformanceInput,
} from 'src/common/interfaces/funds/fundsPerformance';
import createError from 'http-errors';
import { FundsPerformanceModel } from 'src/models';
import { endOfDay, startOfDay } from 'date-fns';
import {
  getPageConnection,
  getSanitizeLimit,
  getSanitizeOffset,
  getSanitizePage,
} from 'src/common/helpers';

/**
 * @description Validate fund performance data
 * @param performance.fundId - ID of the fund
 * @param performance.date - Date of the performance entry
 * @param performance.nav - Net Asset Value
 * @param performance.returnPeriod - Return percentage for the period
 * @throws BadRequest error if validation fails 
 */
const validatePerformance = (performance: CreateFundsPerformanceInput) => {
  if (!isValidObjectId(performance.fundId))
    throw new createError.BadRequest('Invalid fund ID');
  if (performance.date > new Date())
    throw new createError.BadRequest('Date cannot be in the future');
  if (performance.nav <= 0)
    throw new createError.BadRequest('NAV must be greater than zero');
  if (performance.returnPeriod < -100)
    throw new createError.BadRequest('Returns cannot be less than -100%');
};

/**
 * @description Create a new fund performance entry
 * @param data.fundId - ID of the fund
 * @param data.date - Date of the performance entry
 * @param data.nav - Net Asset Value
 * @param data.returnPeriod - Return percentage for the period
 * @returns created fund performance document
 */
export const createFundsPerformance = async (
  data: CreateFundsPerformanceInput
) => {
  validatePerformance(data);

  const newPerformance = await FundsPerformanceModel.create({ ...data });

  return newPerformance;
};

/**
 * @description Get fund performance by ID
 * @param id - ID of the fund performance entry
 * @returns fund performance document
 */
export const getFundPerformancesById = async (id: string | Types.ObjectId) => {
  if (!isValidObjectId(id))
    throw new createError.BadRequest('Invalid fund performance ID');

  const performance = await FundsPerformanceModel.findById(id);

  if (!performance)
    throw new createError.NotFound('Fund performance not found');
  return performance;
};

/**
 * @description Update an existing fund performance entry
 * @param data.performanceId - ID of the performance entry to update
 * @param data.date - (Optional) New date of the performance entry
 * @param data.nav - (Optional) New Net Asset Value
 * @param data.returnPeriod - (Optional) New return percentage for the period
 * @returns updated fund performance document
 */
export const updateFundPerformance = async (
  data: UpdateFundsPerformanceInput
) => {
  const performance = await getFundPerformancesById(data.performanceId);

  const record: Record<string, any> = {
    ...(data.date && { date: data.date }),
    ...(data.nav && { nav: data.nav }),
    ...(data.returnPeriod && { returnPeriod: data.returnPeriod }),
  };

  return await FundsPerformanceModel.findByIdAndUpdate(
    performance._id,
    { $set: record },
    { new: true }
  );
};


/**
 * @description get fund performances with filtering
 * @param data.fundId - (Optional) ID of the fund to filter by
 * @param data.startDate - (Optional) Start date for filtering
 * @param data.endDate - (Optional) End date for filtering
 * @param data.page - (Optional) Page number for pagination (default: 1)
 * @param data.limit - (Optional) Number of items per page (default: 10, max: 100)
 * @param data.sortBy - (Optional) Field to sort by (default: 'date')
 * @param data.sortOrder - (Optional) Sort order: 'asc' or 'desc' (default: 'desc') 
 * @returns paginated list of fund performances
 */
export const getFundsPerformance = async (data: FundsPerformanceFilter) => {
  const filter: FilterQuery<FundsPerformanceDocument> = {
    ...(data.fundId && { fundId: data.fundId }),
    ...(data.startDate &&
      data.endDate && {
        date: {
          $gte: startOfDay(data.startDate),
          $lte: endOfDay(data.endDate),
        },
      }),
  };

  const limit = getSanitizeLimit(data.limit);
  const page = getSanitizePage(data.page);
  const skip = getSanitizeOffset(limit, page);

  const sortBy = data.sortBy || 'date';
  const sortOrder = data.sortOrder === 'asc' ? 1 : -1;

  const options: QueryOptions = {
    sort: { [sortBy]: sortOrder },
    skip,
    limit: limit + 1,
    lean: true,
  };

  const performances = await FundsPerformanceModel.find(filter, null, options);

  return getPageConnection(performances, page, limit);
};
