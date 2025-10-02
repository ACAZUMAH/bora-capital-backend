import { makeExecutableSchema } from "@graphql-tools/schema";
import { generalTypeDefs, generalResolvers } from "./general";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./shield";
import { authResolvers, authTypeDefs } from "./auth";
//import { printSchema } from "graphql";

const typeDefs = [generalTypeDefs, authTypeDefs];

const resolvers = [generalResolvers, authResolvers];

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// console.log("=== BUILT SCHEMA ===");
// console.log(printSchema(executableSchema));
// console.log("=== END SCHEMA ===");

export const schema = applyMiddleware(executableSchema, permissions);
