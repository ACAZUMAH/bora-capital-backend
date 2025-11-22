import {
  LoanAmortizationInput,
  LoanAmortizationResult,
  AmortizationScheduleItem,
} from 'src/common/interfaces';

export const calculateLoanAmortization = (
  data: LoanAmortizationInput
): LoanAmortizationResult => {
  const { principal, rate, term, termType = 'years' } = data;

  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = termType === 'years' ? term * 12 : term;

  // Calculate monthly payment using the formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  let balance = principal;
  let totalInterest = 0;
  const schedule: AmortizationScheduleItem[] = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    // Handle rounding errors for the last payment
    if (balance < 0) balance = 0;

    totalInterest += interestPayment;

    schedule.push({
      paymentNumber: i,
      payment: Number(monthlyPayment.toFixed(2)),
      principalPayment: Number(principalPayment.toFixed(2)),
      interestPayment: Number(interestPayment.toFixed(2)),
      balance: Number(balance.toFixed(2)),
    });
  }

  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalPayment: Number((monthlyPayment * numberOfPayments).toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    schedule,
  };
};
