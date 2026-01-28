import { makeExecutableSchema } from '@graphql-tools/schema';
import { generalTypeDefs, generalResolvers } from './general';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './shield';
import { authResolvers, authTypeDefs } from './auth';
import { UserResolvers, userTypeDefs } from './user';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from 'graphql-scalars';
import { portfolioResolvers, portfolioTypeDefs } from './portfolio';
import { holdingsTypeDefs } from './holdings/typeDefs';
import { holdingsResolvers } from './holdings/resolvers';
import { transactionsResolvers, transactionsTypeDefs } from './transactions';
import { fundsResolvers, fundsTypeDefs } from './funds';
// import { documentsResolvers, documentsTypedefs } from './documents';
import { marketNewsResolvers, marketNewsTypeDefs } from './news';
import { calculatorsResolvers, calculatorsTypeDefs } from './calculators';
import { goalsResolvers, goalsTypeDefs } from './goals';
import { chatBotResolvers, chatBotTypeDefs } from './chatBot';
import { accountResolvers, accountTypeDefs } from './accounts';
import { lookupsResolvers, lookupsTypeDefs } from './lookups';

const typeDefs = [
  generalTypeDefs,
  authTypeDefs,
  userTypeDefs,
  scalarTypeDefs,
  portfolioTypeDefs,
  holdingsTypeDefs,
  transactionsTypeDefs,
  fundsTypeDefs,
  // documentsTypedefs,
  marketNewsTypeDefs,
  calculatorsTypeDefs,
  goalsTypeDefs,
  chatBotTypeDefs,
  accountTypeDefs,
  lookupsTypeDefs,
];

const resolvers = [
  generalResolvers,
  authResolvers,
  UserResolvers,
  scalarResolvers,
  portfolioResolvers,
  holdingsResolvers,
  transactionsResolvers,
  fundsResolvers,
  // documentsResolvers,
  marketNewsResolvers,
  calculatorsResolvers,
  goalsResolvers,
  chatBotResolvers,
  accountResolvers,
  lookupsResolvers,
];

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// console.log("=== BUILT SCHEMA ===");
// console.log(printSchema(executableSchema));
// console.log("=== END SCHEMA ===");

export const schema = applyMiddleware(executableSchema, permissions);
