import { fundsPerformanceTypeDefs } from "./performance/typeDefs";

export const fundsTypeDefs = `#graphql
    ${fundsPerformanceTypeDefs}
    
    type Fund {
        id: ID!
        name: String!
        description: String
        symbol: String!
        objective: String
        baseCurrency: String!
        assetClass: String!
        inceptionDate: DateTime

        createdAt: DateTime
        updatedAt: DateTime
    }

    type FundsConnection {
        edges: [Fund!]!
        pageInfo: PageInfo!
    }

    input GetFundsFilters {
        limit: Int
        page: Int
        search: String
    }

    extend type Query {
        getFundById(fundId: ID!): Fund!
        getFunds(filters: GetFundsFilters!): FundsConnection!
    }

    input CreateFundInput {
        name: String!
        symbol: String!
        description: String!
        assetClass: String!
        objective: String!
        baseCurrency: String!
        inceptionDate: DateTime!
    }

    input UpdateFundInput {
        fundId: ID!
        name: String
        symbol: String
        description: String
        objective: String
    }

    extend type Mutation {
        createFund(data: CreateFundInput!): Fund!
        updateFund(data: UpdateFundInput!): Fund!
        deleteFund(fundId: ID!): Boolean!
    }
`;
