import { createExpressApp } from './servers/createExpressApp';
import http from 'http';
import logger from './loggers/logger';
import connectDB from './common/db';
import createError from 'http-errors';
import { Response, Request, NextFunction } from 'express';
//import { applyRoutes } from './routes';
import { applyMiddlewares } from './middlewares';
import { createGraphqlServer } from './servers/createGraphqlServer';
import { schema } from './graphql';
import { errorHandler } from './middlewares/errorHandler';
const PORT = process.env.PORT || 8080;

export const StartServer = async () => {
  const expressApp = createExpressApp();

  const httpServer = http.createServer(expressApp);

  await connectDB();
  applyMiddlewares(expressApp);
  //applyRoutes(expressApp);

  await createGraphqlServer({ app: expressApp, httpServer, schema });

  expressApp.use(errorHandler);

  expressApp.all(
    '/*splat',
    (_req: Request, _res: Response, next: NextFunction) => {
      next(createError(404, 'Unable to find the requested resource'));
    }
  );

  await new Promise<void>(resolve =>
    httpServer.listen({ port: PORT }, resolve)
  );

  logger.info(`🚀 Server ready at http://localhost:${PORT}`);
  logger.info(`🚀 Graphql Server ready at http://localhost:${PORT}/graphql`);
};
