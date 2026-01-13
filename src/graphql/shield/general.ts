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

/**
 * Validates that the authenticated user owns the requested IdentityID.
 * Used to protect BCL API calls that require identity ownership.
 */
export const ownsIdentity = rule()((_, args, ctx: GraphqlContext) => {
  const identityId = args.identityId || args.data?.identityId;
  if (!identityId) return true; // No identity specified, allow
  return ctx.user?.identityId === identityId;
});

/**
 * Validates that the authenticated user owns the requested AccountNumber.
 * Used to protect BCL API calls that require account ownership.
 */
export const ownsAccount = rule()((_, args, ctx: GraphqlContext) => {
  const accountNumber = args.accountNumber || args.data?.accountNumber;
  if (!accountNumber) return true; // No account specified, allow
  return ctx.user?.accountNumbers?.includes(accountNumber) ?? false;
});

export const rateLimitRule = createRateLimitRule({
  identifyContext: (context: GraphqlContext) => context.ip,
});
