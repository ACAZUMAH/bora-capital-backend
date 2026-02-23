import { allow, shield } from 'graphql-shield';
import { authShield } from './auth';
import { userShield } from './user';
import { portfolioShield } from './portfolio';
import { performanceShield } from './performance';
import { fundsShield } from './funds';
// import { holdingsShield } from './holdings';
import { transactionsShield } from './transactions';
// import { goalsShield } from './goals';
import { accountShield } from './account';

export const permissions = shield(
  {
    Query: {
      ...userShield.Query,
      ...portfolioShield.Query,
      ...performanceShield.Query,
      ...fundsShield.Query,
      ...transactionsShield.Query,
      ...accountShield.Query,
    },
    Mutation: {
      ...authShield.Mutation,
      ...userShield.Mutation,
      ...performanceShield.Mutation,
      ...fundsShield.Mutation,
      ...transactionsShield.Mutation,
      ...accountShield.Mutation,
    },
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
  }
);
