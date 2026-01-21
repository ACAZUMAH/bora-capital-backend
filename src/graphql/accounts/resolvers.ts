import {
  GraphqlContext,
  CreateAccountInput,
  BclAccount,
} from 'src/common/interfaces';
import * as accountService from 'src/services/accounts';

const getMyAccounts = async (_: any, __: any, { user }: GraphqlContext) => {
  const accounts = await accountService.fetchUserAccounts(user!._id!);
  return accounts?.map(normalizeAccount);
};

const getMyAccountsWithNav = async (
  _: any,
  __: any,
  { user }: GraphqlContext
) => {
  const accounts = await accountService.fetchUserAccountsWithNav(user!._id!);
  return accounts?.map(normalizeAccount);
};

const getAccount = async (
  _: any,
  args: { accountNumber: string },
  { user }: GraphqlContext
) => {
  const account = await accountService.fetchAccount(
    user!._id!,
    args.accountNumber
  );
  return account ? normalizeAccount(account) : null;
};

const createAccount = async (
  _: any,
  args: { data: CreateAccountInput },
  { user }: GraphqlContext
) => {
  return accountService.createAccount(user!._id!, args.data);
};

// Normalize BCL response to GraphQL schema
const normalizeAccount = (a: BclAccount) => ({
  accountNumber: a.AccountNumber,
  accountName: a.AccountName,
  portfolioId: a.PortfolioID,
  portfolioName: a.PortfolioName,
  balance: a.Amount,
  nav: a.Nav,
});

export const accountResolvers = {
  Query: {
    getMyAccounts,
    getAccount,
    getMyAccountsWithNav,
  },
  Mutation: {
    createAccount,
  },
};
