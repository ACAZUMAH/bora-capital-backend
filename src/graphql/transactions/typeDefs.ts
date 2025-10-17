export const transactionsTypeDefs = `#graphql
    enum TransactionType {
        DEPOSIT
        WITHDRAWAL
        TRANSFER
        BUY
        SELL
    }

    enum TransactionStatus {
        PENDING
        COMPLETED
        FAILED
        CANCELLED
    }

    enum PaymentMethod {
        BANK_TRANSFER
        CARD
        CASH
        MOBILE_MONEY
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
        status: TransactionStatus!
        transactionDate: DateTime!

        createdAt: DateTime
        updatedAt: DateTime

        # funds relation
        funds: Funds

        # portfolio relation
        portfolio: Portfolio
    }

    type TransactionConnection {
        edges: [Transaction!]!
        pageInfo: PageInfo!
    }

    input TransactionFilters {
        limit: Int
        page: Int
        userId: ID
        fundId: ID
        portfolioId: ID
        providerId: String
        type: TransactionType
        status: TransactionStatus
        search: String
        startDate: DateTime
        endDate: DateTime
    }

    extend type Query {
        getTransactionById(id: ID!): Transaction!
        getTransactions(filters: TransactionFilters!): TransactionConnection!
    }

    input CreateTransactionInput {
        portfolioId: ID!
        fundId: ID!
        userId: ID!
        type: TransactionType!
        amount: Float!
        currency: String!
        quantity: Float!
        providerId: String
        bankAccountId: ID
        reference: String
        description: String
        PaymentStatus: TransactionStatus
        paymentMethod: PaymentMethod
        transactionDate: DateTime
    }

    input UpdateTransactionInput {
        id: ID!
        type: TransactionType
        amount: Float
        currency: String
        quantity: Float
        providerId: String
        bankAccountId: ID
        reference: String
        description: String
        paymentStatus: TransactionStatus
        paymentMethod: PaymentMethod
        transactionDate: DateTime
    }

    input updateTransactionStatusInput {
        id: ID!
        status: TransactionStatus!
    }

    extend type Mutation {
        createTransaction(data: CreateTransactionInput!): Transaction!
        updateTransaction(data: UpdateTransactionInput!): Transaction!
        updateTransactionStatus(data: updateTransactionStatusInput!): Transaction!
    }
`;
