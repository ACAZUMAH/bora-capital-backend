import { ClientApp, SigninInput } from 'src/common/interfaces';
import { userModel } from 'src/models';
import { validateSigninAccess } from './validateAuthAccess';
import createError from 'http-errors';
import { comparePassword } from 'src/common/helpers';
import { createAuth } from './auth';
import { OtpPurpose } from 'src/common/enums';
import { sendEmailViaGmail } from '../notifications';
import { getSendOtpEmailTemplate } from '../notifications/template';
import { rollbar } from 'src/loggers/rollbar';

/**
 * @description Sign in a user by verifying credentials and generating an OTP.
 * @param data - Signin credentials
 * @param app - Client application
 * @returns Success message
 */
export const signin = async (data: SigninInput, app: ClientApp) => {
  const { email, password } = data;

  const user = await userModel.findOne({ email });

  if (!user) throw createError.BadRequest('Invalid credentials');

  const isMatch = await comparePassword(password, user?.password);

  if (!isMatch) throw createError.BadRequest('Invalid credentials');

  if (!validateSigninAccess(app, user)) {
    throw createError.Forbidden(`You do not have access to ${app.name}.`);
  }

  const otp = await createAuth({
    userId: user._id!,
    len: 6,
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
