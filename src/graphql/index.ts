import { makeExecutableSchema } from "@graphql-tools/schema";
import { generalTypeDefs, generalResolvers } from "./general";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./shield";

const typeDefs = [
    generalTypeDefs,
];

const resolvers = [
    generalResolvers,
];

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export const schema = applyMiddleware(executableSchema, permissions);