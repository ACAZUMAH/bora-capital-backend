import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import createError from "http-errors";

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

const holdingsValidationSchema = {
    type: "object",
}