import { rule } from "graphql-shield";
import { GraphqlContext } from "src/common/interfaces";
import { createRateLimitRule } from "graphql-rate-limit";

export const isAuthenticated = rule()((_, __, ctx: GraphqlContext) => {
  return Boolean(ctx.user);
});

export const rateLimitRule = createRateLimitRule({
  identifyContext: (context: GraphqlContext) => context.ip,
});
