export const transactionsTypeDefs = `#graphql
    type Transaction {
        id: ID!
        transactionType: String!
        transactionDate: DateTime!
        instrument: String
        chequeNumber: String
        bankId: String
        bankName: String
        currencyName: String
        amount: Float
        price: Float
        units: Float
        remarks: String
    }

    input TransactionFilters {
        accountNumber: String!
    }

    input TransactionsWithDateRangesFilters {
        accountNumber: String!
        fromDate: String!
        toDate: String!
    }

    extend type Query {
        getTransactionById(id: ID!): Transaction!
        getTransactions(filters: TransactionFilters!): [Transaction]!
        getTransactionsWithDateRanges(filters: TransactionsWithDateRangesFilters!): [Transaction]!
    }

    type DepositCashSuccessResponse {
        erpReffID: String
    }

    type WithdrawalSuccessResponse {
        Description: String
    }

    input DepositCashInput {
        transactionReference: String!
        extTranID: String!
        accountNumber: String!
        transactionDate: String!
        amount: String!
        narration: String!
    }

    input WithdrawCashInput {
        primaryEmail: String!
        mobileNumber: String!
        accountNumber: String!
        transactionDate: String!
        amount: String!
        comment: String!
    }

    extend type Mutation {
        depositCash(data: DepositCashInput!): DepositCashSuccessResponse!
        withdrawCash(data: WithdrawCashInput!): WithdrawalSuccessResponse!
    }
`;
