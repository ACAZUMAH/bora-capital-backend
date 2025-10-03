import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import createError from "http-errors";
import { CreateFundInput } from "src/common/interfaces";

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

const fundsValidationSchema = {
  type: "object",
  properties: {
    symbol: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    assetClass: { type: "string" },
    objective: { type: "string" },
    inceptionDate: { type: "string", format: "date" },
    baseCurrency: { type: "string" },
  },
  additionalProperties: false,
  required: ["symbol", "name", "assetClass", "objective"],

  errorMessage: {
    properties: {
      symbol: "Symbol must be a string",
      name: "Name must be a string",
      description: "Description must be a string",
      assetClass: "Asset Class must be a string",
      objective: "Objective must be a string",
      inceptionDate: "Inception Date must be a valid date",
    },
    required: {
      symbol: "Symbol is required",
      name: "Name is required",
      assetClass: "Asset Class is required",
      objective: "Objective is required",
    },
  },
};


export const validateFundData = (data: CreateFundInput) => {
    const validate = ajv.compile(fundsValidationSchema);

    const isValid = validate(data);

    if (!isValid) throw createError(400, ajv.errorsText(validate.errors)); 
}