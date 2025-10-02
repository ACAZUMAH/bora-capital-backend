import { resetUserPassword } from "src/controllers";
import { isAuthenticated, rateLimitRule } from "./general";

export const authShield = {
  Mutation: {
    signup: rateLimitRule({
      max: 5,
      window: "1m",
      message: "Too many signup attempts, please try again later.",
    }),
    signin: rateLimitRule({
      max: 3,
      window: "1m",
      message: "Too many signin attempts, please try again later.",
    }),
    forgetPassword: rateLimitRule({
      max: 3,
      window: "1m",
      message: "Too many requests, please try again later.",
    }),
    verifyOtpAndCompleteAuth: rateLimitRule({
      max: 5,
      window: "1m",
      message: "Too many OTP verification attempts, please try again later.",
    }),
    resetUserPassword: isAuthenticated,
  },
};
