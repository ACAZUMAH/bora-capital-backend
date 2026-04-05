import { isAuthenticated, rateLimitRule } from './general';

export const authShield = {
  Mutation: {
    signup: rateLimitRule({
      max: 5,
      window: '1m',
      message: 'Too many signup attempts, please try again later.',
    }),
    signin: rateLimitRule({
      max: 3,
      window: '1m',
      message: 'Too many signin attempts, please try again later.',
    }),
    forgetPassword: rateLimitRule({
      max: 3,
      window: '1m',
      message: 'Too many requests, please try again later.',
    }),
    verifyOtpAndCompleteAuth: rateLimitRule({
      max: 5,
      window: '1m',
      message: 'Too many OTP verification attempts, please try again later.',
    }),
    resendOtp: rateLimitRule({
      max: 3,
      window: '1m',
      message: 'Too many OTP resend attempts, please try again later.',
    }),
    refreshToken: rateLimitRule({
      max: 10,
      window: '1m',
      message: 'Too many refresh token attempts, please try again later.',
    }),
    authenticateExistingCustomer: rateLimitRule({
      max: 3,
      window: '1m',
      message: 'Too many authentication attempts, please try again later.',
    }),
    resetUserPassword: isAuthenticated,
    logout: isAuthenticated,
  },
};
