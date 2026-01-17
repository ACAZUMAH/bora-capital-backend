export const portfolioTypeDefs = `#graphql
    type Portfolio {
        portfolioId: ID!
        portfolioName: String!
        offerPrice: Float!
    }

    extend type Query {
        getPortfolios: [Portfolio!]!
        getPortfolioById(portfolioId: ID!): Portfolio
    }
`;
