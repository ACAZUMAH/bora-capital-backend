export const portfolioTypeDefs = `#graphql
    type Allocation {
        assetClass: String!
        totalValue: Float!
        percentage: Float!
    }

    type Portfolio {
        id: ID!
        userId: ID!
        name: String!
        valuation: Float
        currency: String!
        asOf: DateTime

        createdAt: DateTime
        updatedAt: DateTime

    }

    extend type Query {
        getPortfolioById(portfolioId: ID!): Portfolio!
        getPortfoliosByUserId(userId: ID!): [Portfolio!]!
        getAssetAllocations(portfolioId: ID!): [Allocation!]!
    }
`