export const accountTypeDefs = `#graphql
    type Account {
        accountNumber: ID!
        accountName: String!
        portfolioId: String!
        portfolioName: String
        currencyCode: String
        balance: Float
        nav: Float
    }

    input CreateAccountInput {
        portfolioId: String!
        accountName: String!
        currencyCode: String!
    }

    extend type Query {
        getMyAccounts: [Account!]!
        getMyAccountsWithNav: [Account!]!
        getAccount(accountNumber: String!): Account
    }

    extend type Mutation {
        createAccount(data: CreateAccountInput!): Account!
    }
`;
