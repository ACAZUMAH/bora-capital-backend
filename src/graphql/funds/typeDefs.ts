import { fundsPerformanceTypeDefs } from "./performance/typeDefs";

export const fundsTypeDefs = `#graphql
    ${fundsPerformanceTypeDefs}
    
    type Funds {
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

    input GetFundsFilters {
        limit: Int
        page: Int
        search: String
    }

    extend type Query {
        getFundById(fundId: ID!): Funds!
        getFunds(filters: GetFundsFilters!): [Funds!]!
    }

    input CreateFundInput {
        name: String!
        symbol: String!
        description: String
        assetClass: String!
        objective: String!
        baseCurrency: String!
        inceptionDate: DateTime
    }

    input UpdateFundInput {
        fundId: ID!
        name: String
        symbol: String
        description: String
        objective: String
    }

    extend type Mutation {
        createFund(data: CreateFundInput!): Funds!
        updateFund(data: UpdateFundInput!): Funds!
        deleteFund(fundId: ID!): Boolean!
    }
`;
