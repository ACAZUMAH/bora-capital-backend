import { GraphqlContext, CreateAccountInput } from 'src/common/interfaces';
import * as accountService from 'src/services/accounts';

const getMyAccounts = async (_: any, __: any, { user }: GraphqlContext) => {
  return await accountService.fetchUserAccounts(user!._id!);
};

const getMyAccountsWithNav = async (
  _: any,
  __: any,
  { user }: GraphqlContext
) => {
  return await accountService.fetchUserAccountsWithNav(user!._id!);
};

const getAccount = async (
  _: any,
  args: { accountNumber: string },
  { user }: GraphqlContext
) => {
  return await accountService.fetchAccount(user!._id!, args.accountNumber);
};

const createAccount = async (
  _: any,
  args: { data: CreateAccountInput },
  { user }: GraphqlContext
) => {
  return accountService.createAccount(user!._id!, args.data);
};

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
