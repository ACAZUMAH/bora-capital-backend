import { rule } from 'graphql-shield';
import { GraphqlContext } from 'src/common/interfaces';
import { createRateLimitRule } from 'graphql-rate-limit';
import { role } from 'src/common/enums';

export const isAuthenticated = rule()((_, __, ctx: GraphqlContext) => {
  return Boolean(ctx.user);
});

export const isAdmin = rule()((_, __, ctx: GraphqlContext) => {
  return Boolean(ctx.user?.role === role.ADMIN);
});

export const isAdvisor = rule()((_, __, ctx: GraphqlContext) => {
  return Boolean(ctx.user?.role === role.ADVISOR);
});

export const isClient = rule()((_, __, ctx: GraphqlContext) => {
  return Boolean(ctx.user?.role === role.CLIENT);
});

export const rateLimitRule = createRateLimitRule({
  identifyContext: (context: GraphqlContext) => context.ip,
});
