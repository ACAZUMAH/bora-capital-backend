import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import createError from 'http-errors';
import { createGoalInput } from 'src/common/interfaces';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

const goalValidationSchema = {
  type: 'object',

  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    targetAmount: { type: 'number' },
    targetDate: { type: 'string', format: 'date-time' },
    targetCurrency: { type: 'string' },
  },

  additionalProperties: false,

  required: ['name', 'type', 'targetAmount', 'targetDate'],

  errorMessage: {
    properties: {
      name: 'Name must be a string',
      type: 'Type must be a string',
      targetAmount: 'Target amount must be a number',
      targetDate: 'Target date must be a valid date-time string',
      targetCurrency: 'Target currency must be a string',
    },

    required: {
      name: 'Name is required',
      type: 'Type is required',
      targetAmount: 'Target amount is required',
      targetDate: 'Target date is required',
    },
  },
};

export const validateCreateGoalData = (data: createGoalInput) => {
  const validate = ajv.compile(goalValidationSchema);

  const isValid = validate(data);

  if (!isValid) {
    throw createError(400, ajv.errorsText(validate.errors));
  }
};
