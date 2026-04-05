import { GraphqlSubscriptionServer } from 'src/common/interfaces';
import { WebSocketServer } from 'ws';
// @ts-expect-error
import { useServer } from 'graphql-ws/use/ws';
import { jwtVerify } from 'src/common/helpers';
import { getUserById } from 'src/services/users';

export const createGraphqlSubscriptionServer = ({
  httpServer,
  schema,
}: GraphqlSubscriptionServer) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: any) => {
        const token =
          ctx.connectionParams?.authorization ||
          ctx.connectionParams?.Authorization;

        if (!token) {
          throw new Error('Missing authentication token');
        }

        try {
          const bearerToken = token.startsWith('Bearer ')
            ? token.slice(7)
            : token;
          const data: any = jwtVerify(bearerToken, 'access');

          if (!data?.id) {
            throw new Error('Invalid token');
          }

          const user = await getUserById(data.id);
          return { user };
        } catch {
          throw new Error('Authentication failed');
        }
      },
      onConnect: async (ctx: any) => {
        const token =
          ctx.connectionParams?.authorization ||
          ctx.connectionParams?.Authorization;

        if (!token) {
          return false; // Reject the connection
        }

        return true;
      },
    },
    wsServer
  );

  return serverCleanup;
};
