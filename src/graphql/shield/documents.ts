import { and, rule } from "graphql-shield";
import { GraphqlContext } from "src/common/interfaces";
import { isAdvisor, isAuthenticated } from "./general";
import { MutationDeleteDocumentArgs } from "src/common/interfaces/graphql";

const canDeleteDocument = rule()((_, args: MutationDeleteDocumentArgs, ctx: GraphqlContext) => {
    return Boolean(ctx.user && ctx.user._id === args?.data?.userId);
});

export const documentsShield = {
    Query: {
        getUserDocuments: isAuthenticated,
        getDocumentById: isAuthenticated,
        getClientsDocuments: and(isAuthenticated, isAdvisor),
    },
    Mutation: {
        createDocument: isAuthenticated,
        deleteDocument: and(isAuthenticated, canDeleteDocument),
    },
};