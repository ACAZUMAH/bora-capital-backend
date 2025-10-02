import { allow, shield } from "graphql-shield";
import { authShield } from "./auth";

export const permissions = shield(
  {
    Query: {},
    Mutation: {
      ...authShield.Mutation,
    },
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
  }
);
