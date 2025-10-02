import * as GraphqlTypes from "src/common/interfaces";
import * as UserService from "src/services/users";

const me = (_: any, __: any, { user }: GraphqlTypes.GraphqlContext) => {
  return UserService.getUserById(`${user?._id}`);
};

const updateUser = (_: any) => {};

export const UserResolvers = {
  Query: {
    me,
  },
  Mutation: {
    updateUser,
  },
};
