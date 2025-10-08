export const transactionsTypeDefs = `#graphql
    enum TransactionType {
        DEPOSIT
        WITHDRAWAL
        TRANSFER
        BUY
        SELL
        FEE
    }

    type Transaction {
        id: ID!
        portfolioId: ID!
        fundId: ID!
        userId: ID!
        type: TransactionType!
        amount: Float!
        currency: String!
        quantity: Float!
        providerId: String
        bankAccountId: ID
        reference: String!
        description: String
        status: String!
        executedAt: DateTime!

        createdAt: DateTime
        updatedAt: DateTime
    }
`