import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import { ClientApp } from "../interfaces";
import { apps, customerMobileApp } from "../constants";

export const getApp = (key?: string) => {
  return apps.find((app) => app.key === key)
}

/**
 * @description Signs a JSON object into a JWT token.
 * @param obj - The object to be signed into a JWT.
 * @returns A signed JWT token as a string.
 */
export const jwtSign = (obj: object) => {
  return jwt.sign(obj, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "50d" });
};

/**
 * @description Verifies a JWT token and decodes its payload.
 * @param token - The JWT token to verify.
 * @returns The decoded payload of the token if valid.
 * @throws Will throw an error if the token is invalid or expired.
 */
export const jwtVerify = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
};

/**
 * @description Hashes a plain text password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns A hashed version of the password.
 * @throws Will throw an error if hashing fails.
 */
export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Unable to hash password");
  }
};

/**
 * @description Compares a plain text password with a hashed password.
 * @param password - The plain text password to compare.
 * @param hash - The hashed password to compare against.
 * @returns A boolean indicating whether the passwords match.
 * @throws Will throw an error if comparison fails.
 */
export const comparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("Unable to compare password");
  }
};

/**
 * @description Sanitizes and returns a valid limit number.
 * @param limit - limit number
 * @returns sanitized limit number
 * @example getSanitizeLimit("10") // returns 10
 * @example getSanitizeLimit(10) // returns 10
 * @example getSanitizeLimit(null) // returns 15
 * @example getSanitizeLimit("invalid") // returns 15
 * @example getSanitizeLimit(-1) // returns 1
 * @example getSanitizeLimit(0) // returns 1
 * @example getSanitizeLimit(200) // returns 100
 * @example getSanitizeLimit(undefined) // returns 15
 */
export const getSanitizeLimit = (limit?: string | number | null) => {
  const limitNumber = Number(limit);

  if (Number.isNaN(limitNumber)) return 15;

  return Math.min(Math.max(limitNumber, 1), 100);
};

/**
 * @description Sanitizes and returns a valid page number.
 * @param page - page number
 * @returns
 * @example getSanitizePage("10") // returns 2
 * @example getSanitizePage(10) // returns 3
 * @example getSanitizePage(null) // returns 1
 * @example getSanitizePage("invalid") // returns 1
 * @example getSanitizePage(-1) // returns 1
 * @example getSanitizePage(0) // returns 1
 * @example getSanitizePage(undefined) // returns 1
 */
export const getSanitizePage = (page?: string | number | null) => {
  const pageNumber = Number(page);

  if (Number.isNaN(pageNumber)) return 1;

  return Math.max(pageNumber, 1);
};

/**
 * @description Calculates the offset for pagination based on the provided limit and page number.
 * @param limit - number of items per page
 * @param page - current page number
 * @returns offset for database query
 * @example getSanitizeOffset(10, 1) // returns 0
 */
export const getSanitizeOffset = (limit: number, page: number) => {
  return (page - 1) * limit;
};

/**
 * @description Paginates an array of data and returns a page connection object.
 * @param data - array of data
 * @param page - current page number
 * @param limit - number of items per page
 * @returns paginated data with pageInfo
 */
export const getPageConnection = <T>(
  data: Array<T>,
  page: Number,
  limit: number
) => {
  const hasNextPage = data.length > limit;
  const edges = hasNextPage ? data.slice(0, limit) : data;
  const pageInfo = { hasNextPage, limit, page, total: data.length };

  return { edges, pageInfo };
};

/**
 * @description Constructs a standardized HTTP response object.
 * @param data - The data to include in the response (default is null).
 * @param error - An optional error object of type createError.HttpError to include in the response.
 * @returns An object containing the response data and error details (if any).
 */
export const constructHTTPResponse = (
  data: any = null,
  error: null | createError.HttpError = null
) => {
  const jsonResponse = {
    data: data ? data : null,
    errors: error ? { message: error.message, details: null } : null,
  };
  if (jsonResponse.errors && error?.details) {
    jsonResponse.errors.details = error?.details;
  }

  return jsonResponse;
};

/**
 * @description Generates a random numeric OTP (One-Time Password) of the specified length.
 * @param len - The length of the OTP to generate.
 * @returns A string representing the generated OTP.
 */
export const generateOtp = (len: number) => {
  const chars = "0123456789";
  const charLength = chars.length;
  let otp = "";
  for (let i = 0; i < len; i++) {
    otp += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return otp;
};

/**
 * @description Checks if the provided client application matches the customer mobile app.
 * @param clientApp - client application
 * @returns boolean
 */
export const isCustomerApp = (clientApp: ClientApp) => {
  return clientApp.key === customerMobileApp.key;
};
