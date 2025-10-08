export const holdingsTypeDefs = `#graphql
    type Holdings {
        id: ID!
        portfolioId: ID!
        fundId: ID!
        name: String!
        symbol: String!
        quantity: Float!
        purchasePrice: Float!
        currentPrice: Float!
        currentValue: Float!
        unrealizedPL: Float!
        realizedPL: Float!
        currency: String!
        lastPricedAt: DateTime

        createdAt: DateTime
        updatedAt: DateTime

    }

    type HoldingsConnection {
        edges: [Holdings!]!
        pageInfo: PageInfo!
    }

    input HoldingsFilters {
        limit: Int
        page: Int
        fundId: ID
        portfolioId: ID
        search: String
    }
        
    extend type Query {
        getHoldingsById(holdingsId: ID!): Holdings!
        getHoldings(filters: HoldingsFilters!): HoldingsConnection!
    }
`;
