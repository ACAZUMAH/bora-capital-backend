import { GraphqlContext, UserDocument } from 'src/common/interfaces';
import { MutationUpdateUserArgs } from 'src/common/interfaces/graphql';
import * as UserService from 'src/services/users';
import { getRelations } from 'src/services/users/kyc.service';
import { KycRecordsResolvers } from './kyc/kycRecordsResolvers';

const me = (_: any, __: any, { user }: GraphqlContext) => {
  return UserService.getUserById(`${user?._id}`);
};

const getUserById = (_: any, args: { userId: string }) => {
  return UserService.getUserById(args.userId);
};

const updateUser = (_: any, args: MutationUpdateUserArgs) => {
  return UserService.updateUser(args.data);
};

// Field resolver for User.kycRecords - fetches from BCL
const kycRecords = async (parent: UserDocument) => {
  return await UserService.getKycRecords(parent);
};

const relations = async (parent: UserDocument) => {
  return parent.identityId ? getRelations(parent.identityId) : null;
};

export const UserResolvers = {
  Query: {
    me,
    getUserById,
  },
  Mutation: {
    updateUser,
    ...KycRecordsResolvers.Mutation,
  },
  User: {
    kycRecords,
    relations,
  },
};
