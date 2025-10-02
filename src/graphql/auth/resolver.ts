import * as GraphqlTypes from "src/common/interfaces"
import { sendForgetPasswordOtp, loginUser, register } from "src/services/auth";
import { resetPassword } from "src/services/users";

export const signup = (_: any, args: GraphqlTypes.MutationSignupArgs) => {
    return register({ ...args.data });
};

const signin = (_: any, args: GraphqlTypes.MutationSigninArgs) => {
    return loginUser({ ...args.data });
};

const forgetPassword = (_: any, args: GraphqlTypes.MutationForgetPasswordArgs) => {
    return sendForgetPasswordOtp(args.email);
}

const resetUserPassword = (_: any, args: GraphqlTypes.MutationResetUserPasswordArgs, { user }: GraphqlTypes.GraphqlContext) => {
    return resetPassword({ userId: user?._id!, newPassword: args.newPassword });
}

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
  