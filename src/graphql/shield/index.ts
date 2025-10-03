import { allow, shield } from "graphql-shield";
import { authShield } from "./auth";
import { userShield } from "./user";

export const permissions = shield(
  {
    Query: {
      ...userShield.Query
    },
    Mutation: {
      ...authShield.Mutation,
      ...userShield.Mutation
    },
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
  }
);
