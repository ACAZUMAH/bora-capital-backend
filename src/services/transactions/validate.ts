import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import createError from "http-errors";
import { isValidObjectId } from "mongoose";
import { TransactionStatus, TransactionType } from "src/common/enums";
import {
  CreateTransactionInput,
  TransactionsDocument,
} from "src/common/interfaces";
import { UpdateTransactionInput } from "src/common/interfaces/graphql";

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

const schema = {
  type: "object",

  properties: {
    type: { type: "string", enum: Object.values(TransactionType) },
    amount: { type: "number", minimum: 0 },
    currency: { type: "string", minLength: 3, maxLength: 3 },
    quantity: { type: "number", minimum: 0 },
    providerId: { type: "string", minLength: 1 },
    bankAccountId: { type: "string", minLength: 1 },
    reference: { type: "string", minLength: 1, maxLength: 100 },
    description: { type: "string", minLength: 1, maxLength: 500 },
    paymentStatus: { type: "string", enum: Object.values(TransactionStatus) },
  },

  required: ["type", "amount", "currency", "quantity"],

  errorMessage: {
    properties: {
      type: "Type must be one of the predefined transaction types",
      amount: "Amount must be a non-negative number",
      currency: "Currency must be a 3-letter code",
      quantity: "Quantity must be a non-negative number",
      providerId: "Provider ID must be a non-empty string",
      bankAccountId: "Bank Account ID must be a non-empty string",
      reference: "Reference must be between 1 and 100 characters",
      description: "Description must be between 1 and 500 characters",
    },

    required: {
      type: "Type is required",
      amount: "Amount is required",
      currency: "Currency is required",
      quantity: "Quantity is required",
    },
  },
};

export const validateCreateTransactionData = (data: CreateTransactionInput) => {
  if (!isValidObjectId(data.userId))
    throw createError.BadRequest("Invalid user ID");
  if (!isValidObjectId(data.fundId))
    throw createError.BadRequest("Invalid fund ID");
  if (!isValidObjectId(data.portfolioId))
    throw createError.BadRequest("Invalid portfolio ID");

  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    createError(400, ajv.errorsText(validate.errors, { separator: ", " }));
  }
};

export const validateUpdateTransactionData = (
  data: UpdateTransactionInput,
  transaction?: TransactionsDocument
) => {
  if (!isValidObjectId(data.id))
    throw createError.BadRequest("Invalid transaction ID");

  if (data.type && !Object.values(TransactionType).includes(data.type))
    throw createError.BadRequest(
      "Type must be one of the predefined transaction types"
    );

  if (data.amount !== undefined && data?.amount! <= 0)
    throw createError.BadRequest("Amount must be a non-negative number");

  if (data.quantity !== undefined && data?.quantity! <= 0)
    throw createError.BadRequest("Quantity must be a non-negative number");

};
