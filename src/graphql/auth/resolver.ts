import { GraphqlContext } from 'src/common/interfaces';
import * as GraphqlTypes from 'src/common/interfaces/graphql';
import * as services from 'src/services/auth';
import { verifyOtpAndSignJwt } from 'src/services/auth/auth';
import { resetPassword } from 'src/services/users';

export const signup = (_: any, args: GraphqlTypes.MutationSignupArgs) => {
  return services.register({ ...args.data });
};

const signin = (
  _: any,
  args: GraphqlTypes.MutationSigninArgs,
  { clientApp }: GraphqlContext
) => {
  return services.signin({ ...args.data }, clientApp!);
};

const logout = (_: any, __: any, { user }: GraphqlContext) => {
  return services.logout(user!._id!);
}

const forgetPassword = (
  _: any,
  args: GraphqlTypes.MutationForgetPasswordArgs
) => {
  return services.sendForgetPasswordOtp(args.email);
};

const resetUserPassword = (
  _: any,
  args: GraphqlTypes.MutationResetUserPasswordArgs,
  { user }: GraphqlContext
) => {
  return resetPassword({ userId: user?._id!, newPassword: args.newPassword });
};

const resendOtp = (
  _: any,
  args: GraphqlTypes.MutationResendOtpArgs
) => {
  return services.resendOtp(args.email);
};

const verifyOtpAndCompleteAuth = (
  _: any,
  args: GraphqlTypes.MutationVerifyOtpAndCompleteAuthArgs
) => {
  return verifyOtpAndSignJwt(args.otp);
};

export const authResolvers = {
  Mutation: {
    signup,
    signin,
    forgetPassword,
    resetUserPassword,
    logout,
    verifyOtpAndCompleteAuth,
  },
};
