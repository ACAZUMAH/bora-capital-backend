import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import createError from 'http-errors';
import { CreateHoldingsInput } from 'src/common/interfaces';
import { isValidObjectId } from 'mongoose';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

const holdingsValidationSchema = {
  type: 'object',
  properties: {
    symbol: { type: 'string', minLength: 1 },
    quantity: { type: 'number', minimum: 0 },
    avgPurchasePrice: { type: 'number', minimum: 0 },
    currentPrice: { type: 'number', minimum: 0 },
    currentValue: { type: 'number', minimum: 0 },
    currency: { type: 'string', minLength: 1 },
    lastPricedAt: { type: 'string', format: 'date-time' },
  },
  required: [
    'symbol',
    'quantity',
    'avgPurchasePrice',
    'currentPrice',
    'currentValue',
  ],

  additionalProperties: false,

  errorMessage: {
    properties: {
      symbol: 'Symbol is required and should be a non-empty string',
      quantity: 'Quantity is required and should be a non-negative number',
      avgPurchasePrice:
        'Purchase Price is required and should be a non-negative number',
      currentPrice:
        'Current Price is required and should be a non-negative number',
      currentValue:
        'Current Value is required and should be a non-negative number',
      currency: 'Currency should be a non-empty string',
      lastPricedAt: 'Last Priced At should be a valid date-time string',
    },
    required: {
      symbol: 'Symbol is required',
      quantity: 'Quantity is required',
      avgPurchasePrice: 'Purchase Price is required',
      currentPrice: 'Current Price is required',
      currentValue: 'Current Value is required',
    },
  },
};

export const validateHoldingsData = (data: CreateHoldingsInput) => {
  if (!isValidObjectId(data.fundId))
    throw createError.BadRequest('Invalid fund ID');
  if (!isValidObjectId(data.portfolioId))
    throw createError.BadRequest('Invalid portfolio ID');

  const validate = ajv.compile(holdingsValidationSchema);

  const isValid = validate(data);

  if (!isValid) {
    throw createError(400, ajv.errorsText(validate.errors));
  }
};
