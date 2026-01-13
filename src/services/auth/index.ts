import { ClientApp, CreateUserInput, SigninInput } from 'src/common/interfaces';
import { checkUserExist, createUser, getUserByEmail } from '../users';
import { comparePassword, hashPassword } from 'src/common/helpers';
import { createAuth } from './auth';
import { sendEmailViaGmail } from '../notifications';
import { getSendOtpEmailTemplate } from '../notifications/template';
import createError from 'http-errors';
import { OtpPurpose } from 'src/common/enums';
import { validateSigninAccess } from './validateAuthAccess';
import { rollbar } from 'src/loggers/rollbar';
import { userModel } from 'src/models';
import { Types } from 'mongoose';

/**
 * @description Lightweight signup - creates user with minimal fields.
 * No BCL API call - KYC is submitted separately.
 *
 * @param data - Minimal signup data (email, phone, password, name, dob, gender)
 * @returns Success message
 */
export const register = async (data: CreateUserInput) => {
  const { email, password } = data;

  // Check if user already exists
  await checkUserExist(email);

  // Hash password and create user
  const hash = await hashPassword(password);
  const user = await createUser({ ...data, password: hash });

  // Generate OTP for email verification
  const otp = await createAuth({
    userId: user._id!,
    len: 5,
    otpPurpose: OtpPurpose.SIGNUP,
  });

  // Send OTP email
  if (user.email) {
    await sendEmailViaGmail({
      from: 'calebazumah9@gmail.com',
      to: user.email,
      subject: 'Your Bora Capitals Advisors OTP code',
      htmlContent: await getSendOtpEmailTemplate(otp, user.email),
    }).catch(error => {
      rollbar.error('Error sending signup otp email', { error, user });
      throw createError.InternalServerError(
        'Failed to send OTP code at the moment, please try again later.'
      );
    });
  }

  return {
    message:
      'Account created successfully, please check your email for the OTP.',
  };
};

/**
 * @description Sign in a user by verifying credentials and generating an OTP.
 */
export const signin = async (data: SigninInput, app: ClientApp) => {
  const { email, password } = data;

  const user = await getUserByEmail(email);

  if (!validateSigninAccess(app, user)) {
    throw createError.Forbidden(`You do not have access to ${app.name}.`);
  }

  if (!user) throw createError.BadRequest('Invalid credentials');

  const isMatch = await comparePassword(password, user?.password);

  if (!isMatch) throw createError.BadRequest('Invalid credentials');

  const otp = await createAuth({
    userId: user._id!,
    len: 5,
    otpPurpose: OtpPurpose.SIGNIN,
  });

  if (user.email) {
    await sendEmailViaGmail({
      from: 'calebazumah9@gmail.com',
      to: user.email,
      subject: 'Your Bora Capitals Advisors OTP code',
      htmlContent: await getSendOtpEmailTemplate(otp, user.email),
    }).catch(error => {
      rollbar.error('Error sending signin otp email', { error, user });
      throw createError.InternalServerError(
        'Failed to send OTP code at the moment, please try again later.'
      );
    });
  }

  return {
    message: 'Please check your email for verification code',
  };
};

/**
 * @description Sends a forgot password OTP to the user's email.
 */
export const sendForgetPasswordOtp = async (email: string) => {
  const user = await getUserByEmail(email);

  const otp = await createAuth({
    userId: user?._id!,
    len: 5,
    otpPurpose: OtpPurpose.FORGOT_PASSWORD,
  });

  if (user.email) {
    await sendEmailViaGmail({
      from: 'calebazumah9@gmail.com',
      to: user.email,
      subject: 'Bora Capitals Advisors OTP code',
      htmlContent: await getSendOtpEmailTemplate(otp, user.email),
    }).catch(error => {
      rollbar.error('Error sending forgot password otp email', { error, user });
      throw createError.InternalServerError(
        'Failed to send OTP code at the moment, please try again later.'
      );
    });
  }

  return {
    message: 'Please check your email for the OTP to reset your password.',
  };
};

/**
 * @description Logout user by invalidating their refresh token.
 */
export const logout = async (userId: string | Types.ObjectId) => {
  await userModel.findByIdAndUpdate(userId, { refreshToken: null });
  return {
    message: 'User logged out successfully.',
  };
};

/**
 * @description Resend OTP to user's email for email verification.
 */
export const resendOtp = async (email: string) => {
  const user = await getUserByEmail(email);

  const otp = await createAuth({
    userId: user?._id!,
    len: 5,
    otpPurpose: OtpPurpose.RESEND_EMAIL_VERIFICATION,
  });

  if (user.email) {
    await sendEmailViaGmail({
      from: 'calebazumah9@gmail.com',
      to: user.email,
      subject: 'Your Bora Capitals Advisors OTP code',
      htmlContent: await getSendOtpEmailTemplate(otp, user.email),
    }).catch(error => {
      rollbar.error('Error resending otp email', { error, user });
      throw createError.InternalServerError(
        'Failed to resend OTP code at the moment, please try again later.'
      );
    });
  }
  return {
    message: 'OTP resent successfully, please check your email.',
  };
};
