import { getUserByEmail } from '../users';
import { createAuth } from './auth';
import { OtpPurpose } from 'src/common/enums';
import { sendEmailViaGmail } from '../notifications';
import { getSendOtpEmailTemplate } from '../notifications/template';
import { rollbar } from 'src/loggers/rollbar';
import createError from 'http-errors';

/**
 * @description Sends a forgot password OTP to the user's email.
 */
export const sendForgetPasswordOtp = async (email: string) => {
  const user = await getUserByEmail(email);

  const otp = await createAuth({
    userId: user?._id!,
    len: 6,
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
