import {
  LoanAmortizationInput,
  InvestmentGrowthInput,
} from 'src/common/interfaces';
import * as services from 'src/services/calculators';

const calculateLoanAmortization = (
  _: any,
  args: { data: LoanAmortizationInput }
) => {
  return services.calculateLoanAmortization(args.data);
};

const calculateInvestmentGrowth = (
  _: any,
  args: { data: InvestmentGrowthInput }
) => {
  return services.calculateInvestmentGrowth(args.data);
};

export const calculatorsResolvers = {
  Query: {
    calculateLoanAmortization,
    calculateInvestmentGrowth,
  },
};
