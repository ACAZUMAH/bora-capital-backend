import { allow, shield } from 'graphql-shield';
import { authShield } from './auth';
import { userShield } from './user';
import { portfolioShield } from './portfolio';

export const permissions = shield(
  {
    Query: {
      ...userShield.Query,
      ...portfolioShield.Query,
    },
    Mutation: {
      ...authShield.Mutation,
      ...userShield.Mutation,
    },
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
  }
);
