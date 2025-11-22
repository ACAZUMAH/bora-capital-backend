import { allow, shield } from 'graphql-shield';
import { authShield } from './auth';
import { userShield } from './user';
import { portfolioShield } from './portfolio';
import { performanceShield } from './performance';
import { fundsShield } from './funds';
import { holdingsShield } from './holdings';
import { transactionsShield } from './transactions';
import { goalsShield } from './goals';

export const permissions = shield(
  {
    Query: {
      ...userShield.Query,
      ...portfolioShield.Query,
      ...performanceShield.Query,
      ...fundsShield.Query,
      ...holdingsShield.Query,
      ...transactionsShield.Query,
      ...goalsShield.Query,
    },
    Mutation: {
      ...authShield.Mutation,
      ...userShield.Mutation,
      ...performanceShield.Mutation,
      ...fundsShield.Mutation,
      ...transactionsShield.Mutation,
      ...goalsShield.Mutation,
    },
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
  }
);
