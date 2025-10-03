import { MutationUpdateUserArgs } from "src/common/interfaces/graphql";
import { isAuthenticated } from "./general";
import { GraphqlContext } from "src/common/interfaces";
import { and, rule } from "graphql-shield";

const canUpdateUser = rule()((
  _,
  args: MutationUpdateUserArgs,
  ctx: GraphqlContext
) => {
  return ctx.user?._id === args.data.id;
});

export const userShield = {
  Query: {
    me: isAuthenticated,
    getUserById: isAuthenticated,
  },
  Mutation: {
    updateUser: and(isAuthenticated, canUpdateUser),
  },
};
