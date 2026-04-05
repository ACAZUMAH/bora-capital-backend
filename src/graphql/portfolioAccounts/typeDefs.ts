export const portfolioAccountTypeDefs = `#graphql
    type PortfolioAccount {
        accountNumber: ID!
        accountName: String!
        portfolioId: String!
        portfolioName: String
        currencyCode: String
        balance: Float
        nav: Float
    }

    input CreatePortfolioAccountInput {
        portfolioId: String!
        accountName: String!
        currencyCode: String!
    }

    extend type Query {
        getMyPortfolioAccounts: [PortfolioAccount!]!
        getMyPortfolioAccountsWithNav: [PortfolioAccount!]!
        getMyPortfolioAccount(accountNumber: String!): PortfolioAccount
    }

    extend type Mutation {
        createPortfolioAccount(data: CreatePortfolioAccountInput!): PortfolioAccount!
    }
`;
