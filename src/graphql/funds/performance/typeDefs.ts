export const fundsPerformanceTypeDefs = `#graphql
    type FundsPerformance {
        id: ID!
        fundId: ID!
        date: String!
        nav: Float!
        returnPeriod: Float!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type FundsPerformanceConnection {
        edges: [FundsPerformance!]!
        pageInfo: PageInfo!
    }

    input FundsFilters {
        fundId: ID
        startDate: DateTime
        endDate: DateTime
        limit: Int
        page: Int
    }

    extend type Query {
        getFundPerformanceById(id: ID!): FundsPerformance!
        getFundPerformances(filters: FundsFilters): FundsPerformanceConnection!
    }

    input CreateFundsPerformanceInput {
        fundId: ID!
        date: DateTime!
        nav: Float!
        returnPeriod: Float!
    } 

    input UpdateFundsPerformanceInput {
        performanceId: ID!
        date: DateTime
        nav: Float
        returnPeriod: Float
    }

    extend type Mutation {
        createFundPerformances(data: CreateFundsPerformanceInput!): FundsPerformance!
        updateFundPerformances(data: UpdateFundsPerformanceInput!): FundsPerformance!
    } 
`;
