import { CreateUserInput } from 'src/common/interfaces';
import { checkUserExist, createUser } from '../users';
import { hashPassword } from 'src/common/helpers';
import { createAuth } from './auth';
import { OtpPurpose } from 'src/common/enums';
import { sendEmailViaGmail } from '../notifications';
import { getSendOtpEmailTemplate } from '../notifications/template';
import { rollbar } from 'src/loggers/rollbar';
import createError from 'http-errors';

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
    len: 6,
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
