import { GraphqlSubscriptionServer } from "src/common/interfaces";
import { WebSocketServer } from "ws";
import { useServer } from 'graphql-ws/dist/use/ws';;

export const createGraphqlSubscriptionServer = ({ httpServer, schema }: GraphqlSubscriptionServer) => {
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/subscriptions',
    })

    const serverCleanup = useServer({ schema }, wsServer);
    
    return serverCleanup;
}
