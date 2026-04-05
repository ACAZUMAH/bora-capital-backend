import { NextFunction, Request, Response } from 'express';
import logger from 'src/loggers/logger';
import createError from 'http-errors';
import { constructHTTPResponse } from 'src/common/helpers';
import { rollbar } from 'src/loggers/rollbar';

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(error);
  rollbar.error(error);

  if (createError.isHttpError(error)) {
    return res.status(error.status).json(constructHTTPResponse(null, error));
  }

  return res
    .status(500)
    .json(
      constructHTTPResponse(null, createError(500, 'Internal server error'))
    );
};
