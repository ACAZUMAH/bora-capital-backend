import { GraphqlContext, CreateAccountInput } from 'src/common/interfaces';
import * as accountService from 'src/services/portfolioAccounts';

const getMyPortfolioAccounts = async (
  _: any,
  __: any,
  { user }: GraphqlContext
) => {
  return await accountService.fetchUserPortfolioAccounts(user!._id!);
};

const getMyPortfolioAccountsWithNav = async (
  _: any,
  __: any,
  { user }: GraphqlContext
) => {
  return await accountService.fetchUserPortfolioAccountsWithNav(user!._id!);
};

const getMyPortfolioAccount = async (
  _: any,
  args: { accountNumber: string },
  { user }: GraphqlContext
) => {
  return await accountService.fetchPortfolioAccount(
    user!._id!,
    args.accountNumber
  );
};

const createPortfolioAccount = async (
  _: any,
  args: { data: CreateAccountInput },
  { user }: GraphqlContext
) => {
  return accountService.createPortfolioAccount(user!._id!, args.data);
};

export const portfolioAccountResolvers = {
  Query: {
    getMyPortfolioAccounts,
    getMyPortfolioAccount,
    getMyPortfolioAccountsWithNav,
  },
  Mutation: {
    createPortfolioAccount,
  },
};
