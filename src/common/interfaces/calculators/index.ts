export interface LoanAmortizationInput {
  principal: number;
  rate: number; // Annual interest rate in percentage (e.g., 5 for 5%)
  term: number; // Term in years
  termType?: 'years' | 'months'; // Default to years
}

export interface AmortizationScheduleItem {
  paymentNumber: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  balance: number;
}

export interface LoanAmortizationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationScheduleItem[];
}

export interface InvestmentGrowthInput {
  initialAmount: number;
  monthlyContribution: number;
  rate: number; // Annual interest rate in percentage
  term: number; // Term in years
  compoundFrequency?: 'monthly' | 'annually'; // Default to monthly
}

export interface InvestmentGrowthResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  schedule: {
    year: number;
    balance: number;
    contribution: number;
    interest: number;
  }[];
}
