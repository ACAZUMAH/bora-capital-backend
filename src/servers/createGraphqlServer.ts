import { ApolloServer, ContextFunction } from '@apollo/server';
import { GraphqlContext, GraphqlServer } from 'src/common/interfaces';
import depthLimit from 'graphql-depth-limit';
import {
  ExpressContextFunctionArgument,
  expressMiddleware,
} from '@as-integrations/express5';
import { createGraphqlSubscriptionServer } from './createGraphqlSubscriptionServer';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { formatGraphqlErrors } from './formatGraphqlErrors';
import { json } from 'express';
import { createDataLoaders } from 'src/dataLoaders';
import { isDevelopment } from 'src/common/constants';

const context: ContextFunction<
  [ExpressContextFunctionArgument],
  GraphqlContext
> = async ({ req }) => {
  return { ...req, ...createDataLoaders(), ip: String(req.ips[0] || req.ip) };
};

export const createGraphqlServer = async ({
  app,
  httpServer,
  schema,
}: GraphqlServer) => {
  const subscriptionServerCleanup = createGraphqlSubscriptionServer({
    httpServer,
    schema,
  });

  const server = new ApolloServer({
    schema,
    introspection: isDevelopment,
    validationRules: [depthLimit(5)],
    formatError: formatGraphqlErrors,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await subscriptionServerCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  const apolloExpressMiddleware = expressMiddleware(server, { context });

  app.use('/graphql', json(), apolloExpressMiddleware);

  return server;
};
