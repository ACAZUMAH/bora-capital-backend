import * as GraphqlTypes from "src/common/interfaces"
import { loginUser, register } from "src/services/auth";

export const signup = (_: any, args: GraphqlTypes.MutationSignupArgs) => {
    return register({ ...args.data });
};

const signin = (_: any, args: GraphqlTypes.MutationSigninArgs) => {
    return loginUser({ ...args.data });
};

const forgetPassword = (_: any, args: GraphqlTypes.MutationForgetPasswordArgs) => {}

const resetUserPassword = (_: any, args: GraphqlTypes.MutationResetUserPasswordArgs) => {}

const verifyOtpAndCompleteAuth = (_: any, args: GraphqlTypes.MutationVerifyOtpAndCompleteAuthArgs) => {}

export const authResolvers = {
  Mutation: {
    signup,
    signin,
    forgetPassword,
    resetUserPassword,
    verifyOtpAndCompleteAuth,
  },
};
  