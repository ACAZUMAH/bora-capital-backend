export const transactionsTypeDefs = `#graphql
    enum TransactionType {
        DEPOSIT
        WITHDRAWAL
        TRANSFER
        BUY
        SELL
        FEE
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
    }

    extend type Query {
        getTransactionById(id: ID!): Transaction!
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

    extend type Mutation {
        createTransaction(data: CreateTransactionInput!): Transaction!
        updateTransaction(data: UpdateTransactionInput!): Transaction!
    }
`;
