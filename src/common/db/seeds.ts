import { faker } from '@faker-js/faker';
import { FundsDocument } from '../interfaces';
import { CreateFundInput } from '../interfaces';
import { CreateFundsPerformanceInput } from '../interfaces/funds/fundsPerformance';
import { fundsModel, FundsPerformanceModel } from 'src/models';

const currencies = ['USD', 'EUR', 'GBP', 'GHS'];
const assetClasses = [
  'Equity',
  'Fixed Income',
  'Real Estate',
  'Commodities',
  'Mixed',
  'Money Market',
  'Balanced',
  'Alternative',
];

const fundDescriptions = [
  'This fund seeks to provide long-term capital growth by investing in a diversified portfolio of equities.',
  'The fund aims to generate income and capital appreciation through investments in fixed income securities.',
  'A balanced approach to investing, combining both equity and fixed income securities to manage risk.',
  'This fund focuses on preserving capital while generating steady returns through money market instruments.',
  'The fund invests in real estate and property-related securities to provide income and capital growth.',
  'A diversified portfolio focused on commodities and natural resources for long-term appreciation.',
  'This fund seeks to maximize returns through alternative investments and strategic asset allocation.',
  'The fund provides exposure to emerging markets with high growth potential.',
];

const fundObjectives = [
  'Achieve superior risk-adjusted returns over the long term.',
  'Provide consistent income through dividends and interest payments.',
  'Preserve capital while generating moderate growth.',
  'Maximize total returns through strategic asset allocation.',
  'Generate income and capital appreciation for investors.',
  'Outperform benchmark indices while managing volatility.',
  'Deliver sustainable growth through diversified investments.',
  'Provide liquidity and stable returns with minimal risk.',
];

const createFundsSeed = (count: number): CreateFundInput[] => {
  return Array(count)
    .fill('')
    .map(() => {
      return {
        name: faker.company.name() + ' Fund',
        description: faker.helpers.arrayElement(fundDescriptions),
        assetClass: faker.helpers.arrayElement(assetClasses),
        symbol: faker.string.alpha({ length: 4, casing: 'upper' }),
        objective: faker.helpers.arrayElement(fundObjectives),
        inceptionDate: faker.date.past({ years: 5 }),
        baseCurrency: faker.helpers.arrayElement(currencies),
      };
    });
};

const createFundPerformanceSeed = (
  funds: FundsDocument[],
  monthsOfHistory: number = 12
) => {
  const performances: CreateFundsPerformanceInput[] = [];

  funds.forEach(fund => {
    let previousNav = faker.number.float({
      min: 10,
      max: 100,
      fractionDigits: 2,
    });

    for (let i = monthsOfHistory; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);

      const change = faker.number.float({ min: -5, max: 5, fractionDigits: 2 });
      const currentNav = previousNav * (1 + change / 100);

      performances.push({
        fundId: fund._id,
        date: date,
        nav: parseFloat(currentNav.toFixed(2)),
        returnPeriod: parseFloat(change.toFixed(2)),
      });

      previousNav = currentNav;
    }
  });

  return performances;
};

export const syncSeeds = async () => {
  try {
    console.log('####### connecting to database... #######');

    const funds = createFundsSeed(10);
    console.log('####### seeding funds... #######');
    await fundsModel.collection.drop();
    const fundDocs: FundsDocument[] = await fundsModel.insertMany(funds);
    console.log(`${fundDocs.length} funds seeded.`);

    const performances = createFundPerformanceSeed(fundDocs, 24);
    console.log('####### seeding fund performances... #######');
    await FundsPerformanceModel.collection.drop();
    const performance = await FundsPerformanceModel.insertMany(performances);
    console.log(`${performance.length} fund performances seeded.`);

    console.log('####### seeding completed. #######');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

//syncSeeds();
