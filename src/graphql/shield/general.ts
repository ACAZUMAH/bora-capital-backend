import { rule } from "graphql-shield";
import { GraphqlContext } from "src/common/interfaces";

export const isAuthenticated = rule()((_, __, ctx: GraphqlContext) => {
  return Boolean(ctx.user);
});
