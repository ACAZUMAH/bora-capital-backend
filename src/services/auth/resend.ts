import { OtpPurpose } from 'src/common/enums';
import { getUserByEmail } from '../users';
import { createAuth } from './auth';
import { sendEmailViaGmail } from '../notifications';
import { getSendOtpEmailTemplate } from '../notifications/template';
import { rollbar } from 'src/loggers/rollbar';
import createError from 'http-errors';

/**
 * @description Resend OTP to user's email for email verification.
 * @param email - The email of the user to resend OTP to
 * @returns Success message
 */
export const resendOtp = async (email: string) => {
  const user = await getUserByEmail(email);

  const otp = await createAuth({
    userId: user?._id!,
    len: 6,
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
