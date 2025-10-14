import { and } from "graphql-shield";
import { isAdmin, isAuthenticated } from "./general";

export const fundsShield = {
  Query: {
    getFundById: isAuthenticated,
    getFunds: isAuthenticated,
  },
  Mutation: {
    createFund: and(isAuthenticated, isAdmin),
    updateFund: and(isAuthenticated, isAdmin),
    deleteFund: and(isAuthenticated, isAdmin),
  },
};
