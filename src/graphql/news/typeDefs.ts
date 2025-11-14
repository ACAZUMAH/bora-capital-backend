export const marketNewsTypeDefs = `#graphql
    type MarketNews {
        id: ID!
        title: String!
        source: String!
        url: String!
        summary: String!
        content: String!
        author: String!
        publishedAt: String!
        tag: [String!]!

        createdAt: String!
        updatedAt: String!
    }

    type MarketNewsConnection {
        edges: [MarketNews!]!
        pageInfo: PageInfo!
    }

    input MarketNewsFilters {
        limit: Int
        page: Int
        tag: String
        search: String
    }

    extend type Query {
        getMarketNews(filters: MarketNewsFilters!): MarketNewsConnection!
        getMarketNewsById(id: ID!): MarketNews
    }
`;
