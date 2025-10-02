import { GraphQLFormattedError } from "graphql";
import { unwrapResolverError } from "@apollo/server/errors";
import logger from "src/loggers/logger";
import createError from "http-errors";
import { rollbar } from "src/loggers/rollbar";

export const errorCodes = new Map<number, string>([
  [400, "BAD_REQUEST"],
  [401, "UNAUTHORIZED"],
  [403, "FORBIDDEN"],
  [404, "NOT_FOUND"],
  [500, "INTERNAL_SERVER_ERROR"],
  [502, "BAD_GATEWAY"],
]);

export const formatGraphqlErrors = (
  formatError: GraphQLFormattedError,
  errors: unknown
) => {
  const unwrappedError: any = unwrapResolverError(errors);
  logger.error(unwrappedError);

  if (createError.isHttpError(unwrappedError)) {
    rollbar.error(`GraphQL Error: ${unwrappedError.message}`, {
      error: unwrappedError,
      formatError,
    });
    return formatError;
  }

  return {
    ...formatError,
    message: unwrappedError.message,
    extensions: {
      ...formatError.extensions,
      code: errorCodes.get(unwrappedError.status) || "INTERNAL_SERVER_ERROR",
    },
  };
};
