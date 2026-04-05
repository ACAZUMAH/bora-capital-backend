import { AuthExistingCustomerInput } from 'src/common/interfaces';
import { randomBytes } from 'crypto';
import { createUser, fetchIdentity } from '../users';
import createError from 'http-errors';
import { createAuth } from './auth';
import { OtpPurpose } from 'src/common/enums';
import { sendEmailViaGmail } from '../notifications';
import { getSendOtpEmailTemplate } from '../notifications/template';
import { rollbar } from 'src/loggers/rollbar';

/**
 * @description Authenticate an existing customer by verifying their identity and generating an OTP.
 * @param data.email - The email of the user to authenticate
 * @param data.phoneNumber - The phone number of the user to authenticate
 * @param data.identityId - The identity ID of the user to authenticate
 * @returns Success message
 */
export const authExistingCustomer = async (data: AuthExistingCustomerInput) => {
  const kycInfo = await fetchIdentity({
    IdentityID: data.identityId,
    PrimaryEmail: data.email,
    MobileNumber: data.phoneNumber,
  });

  if (!kycInfo) throw createError.NotFound('User not found');

  const user = await createUser({
    email: data.email,
    firstName: kycInfo.FirstName,
    lastName: kycInfo.LastName,
    phoneNumber: data.phoneNumber,
    password: randomBytes(32).toString('hex'),
  });

  const otp = await createAuth({
    userId: user._id!,
    len: 6,
    otpPurpose: OtpPurpose.AUTH_EXISTING_CUSTOMER,
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
