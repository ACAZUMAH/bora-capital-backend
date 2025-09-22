import { createExpressApp } from "./server/createExpressApp";
import http from "http";
import logger from "./loggers/logger";
import connectDB from "./common/db";
import createError from "http-errors";
import { Response, Request, NextFunction } from "express";
import { applyRoutes } from "./routes";
import { applyMiddlewares } from "./middlewares";

const PORT = process.env.PORT || 3000;

export const StartServer = async () => {
  const expressApp = createExpressApp();

  const httpServer = http.createServer(expressApp);

  await connectDB();
  applyMiddlewares(expressApp);
  applyRoutes(expressApp);

  expressApp.use(
    "/*\w",
    (_req: Request, _res: Response, next: NextFunction) => {
      next(createError(404, "Unable to find the requested resource"));
    }
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  logger.info(`🚀 Server ready at http://localhost:${PORT}`);
};
