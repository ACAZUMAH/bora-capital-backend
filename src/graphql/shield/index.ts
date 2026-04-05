import { deny, shield } from 'graphql-shield';
import { authShield } from './auth';
import { userShield } from './user';
import { portfolioShield } from './portfolio';
import { transactionsShield } from './transactions';
import { portfolioAccountShield } from './portfolioAccount';
import { chatBotShield } from './chatbot';
import { newsShield } from './news';
import { lookupsShield } from './lookups';

export const permissions = shield(
  {
    Query: {
      ...userShield.Query,
      ...portfolioShield.Query,
      ...transactionsShield.Query,
      ...portfolioAccountShield.Query,
      ...newsShield.Query,
      ...lookupsShield.Query,
    },
    Mutation: {
      ...authShield.Mutation,
      ...userShield.Mutation,
      ...transactionsShield.Mutation,
      ...portfolioAccountShield.Mutation,
      ...chatBotShield.Mutation,
    },
  },
  {
    fallbackRule: deny,
    allowExternalErrors: true,
  }
);
