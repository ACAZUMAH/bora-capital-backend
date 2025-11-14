export const fundsPerformanceTypeDefs = `#graphql
    type FundPerformance {
        id: ID!
        fundId: ID!
        date: String!
        nav: Float!
        returnPeriod: Float!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type FundPerformanceConnection {
        edges: [FundPerformance!]!
        pageInfo: PageInfo!
    }

    input PerformanceFilters {
        fundId: ID
        startDate: DateTime
        endDate: DateTime
        limit: Int
        page: Int
    }

    extend type Query {
        getFundPerformanceById(id: ID!): FundPerformance!
        getFundPerformances(filters: PerformanceFilters): FundPerformanceConnection!
    }

    input CreateFundPerformancesInput {
        fundId: ID!
        date: DateTime!
        nav: Float!
        returnPeriod: Float!
    } 

    input UpdateFundPerformancesInput {
        performanceId: ID!
        date: DateTime
        nav: Float
        returnPeriod: Float
    }

    extend type Mutation {
        createFundPerformances(data: CreateFundPerformancesInput!): FundPerformance!
        updateFundPerformances(data: UpdateFundPerformancesInput!): FundPerformance!
    } 
`;
