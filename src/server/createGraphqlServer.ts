import { ApolloServer, ContextFunction } from "@apollo/server";
import { GraphqlContext, GraphqlServer } from "src/common/interfaces";
import { ExpressContextFunctionArgument, expressMiddleware } from "@as-integrations/express4"
import cors from "cors";
import { createGraphqlSubscriptionServer } from "./createGraphqlSubscriptionServer";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { formatGraphqlErrors } from "./formatGraphqlErrors";

const context: ContextFunction<[ExpressContextFunctionArgument], GraphqlContext> = async ({ req }) => {
    const user = req.user;
    const token = req.token;

    return { user, token };
}

export const createGraphqlServer = async ({ app, httpServer, schema }: GraphqlServer) => {
    const subscriptionServerCleanup = createGraphqlSubscriptionServer({ httpServer, schema });

    const server = new ApolloServer({
        schema,
        formatError: formatGraphqlErrors,
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        await subscriptionServerCleanup.dispose();
                    }
                }
            }},
            ApolloServerPluginDrainHttpServer({ httpServer })
        ]
    })

    await server.start();

    const apolloMiddleware = expressMiddleware(server, { context });

    app.use("/graphql", cors(), apolloMiddleware);

    return server;
}