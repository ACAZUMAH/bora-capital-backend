export const calculatorsTypeDefs = `#graphql
    type AmortizationScheduleItem {
        paymentNumber: Int!
        payment: Float!
        principalPayment: Float!
        interestPayment: Float!
        balance: Float!
    }

    type LoanAmortizationResult {
        monthlyPayment: Float!
        totalPayment: Float!
        totalInterest: Float!
        schedule: [AmortizationScheduleItem!]!
    }

    input LoanAmortizationInput {
        principal: Float!
        rate: Float!
        term: Int!
        termType: String
    }

    type InvestmentGrowthScheduleItem {
        year: Int!
        balance: Float!
        contribution: Float!
        interest: Float!
    }

    type InvestmentGrowthResult {
        futureValue: Float!
        totalContributions: Float!
        totalInterest: Float!
        schedule: [InvestmentGrowthScheduleItem!]!
    }

    input InvestmentGrowthInput {
        initialAmount: Float!
        monthlyContribution: Float!
        rate: Float!
        term: Int!
        compoundFrequency: String
    }

    type Query {
        calculateLoanAmortization(data: LoanAmortizationInput!): LoanAmortizationResult!
        calculateInvestmentGrowth(data: InvestmentGrowthInput!): InvestmentGrowthResult!
    }
`;
