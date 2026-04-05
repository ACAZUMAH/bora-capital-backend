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

    extend type Query {
        getTransactions(filters: TransactionFilters!): [Transaction]!
        getTransactionsWithDateRanges(filters: TransactionsWithDateRangesFilters!): [Transaction]!
    }

    extend type Mutation {
        depositCash(data: DepositCashInput!): DepositCashSuccessResponse!
        withdrawCash(data: WithdrawCashInput!): WithdrawalSuccessResponse!
    }
`;
