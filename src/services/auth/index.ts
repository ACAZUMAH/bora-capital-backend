import { ClientApp, CreateUserInput, SigninInput } from 'src/common/interfaces';
import {
  checkUserExist,
  createUser,
  getUserByEmail,
  linkIdentityId,
} from '../users';
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
import { addIndividualIdentity } from '../bcl';

/**
 * @description Signup a new user by creating their account locally and in BCL.
 *
 * @param data - The input data including auth fields and BCL KYC data.
 * @returns An object containing a success message.
 * @throws Will throw an error if email already exists or BCL API fails.
 */
export const register = async (data: CreateUserInput) => {
  const { email, password, phoneNumber } = data;

  // Check if user already exists locally
  await checkUserExist(email);

  // Hash password
  const hash = await hashPassword(password);

  // Create user in local database first
  const user = await createUser({ ...data, password: hash });

  try {
    // Create identity in BCL API
    const identityId = await addIndividualIdentity({
      FirstName: data.firstName,
      MiddleName: data.middleName,
      LastName: data.lastName,
      Gender: data.gender,
      Title: data.title,
      DateOfBirth: data.dateOfBirth,
      ResidencyStatus: data.residencyStatus,
      PassPortNumber: data.passportNumber,
      IDNumber: data.idNumber,
      MaritalStatus: data.maritalStatus,
      SourceOfFunds: data.sourceOfFunds,
      SpouseName: data.spouseName,
      Occupation: data.occupation,
      NextOfKin: data.nextOfKin,
      PostalAddress: data.postalAddress,
      NationalityCountryCode: data.nationalityCountryCode,
      ResidencyCountryCode: data.residencyCountryCode,
      CurrencyCode: data.currencyCode,
      PhysicalAddress: data.physicalAddress,
      MobileNumber: phoneNumber || '',
      PrimaryEmail: email,
      PinNumber: data.pinNumber,
      Relations: data.relations?.map(r => ({
        RelationshipID: r.relationshipId,
        Name: r.name,
        Email: r.email,
        PhoneNumber: r.phoneNumber,
        IDNumber: r.idNumber,
        DOB: r.dob,
        BeneficiaryPercentage: r.beneficiaryPercentage,
      })),
    });

    // Link BCL IdentityID to user
    await linkIdentityId(user._id!, identityId);
  } catch (error: any) {
    // If BCL fails, delete local user and throw error
    await userModel.findByIdAndDelete(user._id);
    rollbar.error('BCL identity creation failed', { error, email });
    throw createError.BadRequest(
      error.message || 'Failed to create identity. Please try again.'
    );
  }

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
 * @description signin a user by verifying their credentials and generating an OTP.
 * @param data.email - email of the user
 * @param data.password - password of the user
 * @param app - client app
 * @returns An object containing the generated OTP if in development mode.
 * @throws Will throw an error if the credentials are invalid.
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
      subject: 'Your Bora Capitals Advisors otp code',
      htmlContent: await getSendOtpEmailTemplate(otp, user.email),
    }).catch(error => {
      rollbar.error('Error sending signin otp email', { error, user });
      throw createError.InternalServerError(
        'Failed to send OTP code at the moment, please try again later.'
      );
    });
  }

  return {
    message: 'Please check your mail for verification code',
  };
};

/**
 * @description Sends a forgot password OTP to the user's email.
 * @param email - user's email
 * @returns A message indicating that the OTP has been sent.
 * @throws Will throw an error if the user with the provided email does not exist.
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
      subject: 'Bora Capitals Advisors otp code',
      htmlContent: await getSendOtpEmailTemplate(otp, user.email),
    }).catch(error => {
      rollbar.error('Error sending forgot password otp email', { error, user });
      throw createError.InternalServerError(
        'Failed to send OTP code at the moment, please try again later.'
      );
    });
  }

  return {
    message: 'Please check your phone for the OTP to change your password.',
  };
};

/**
 * @description Logout user by invalidating their refresh token.
 * @param userId - ID of the user to logout
 * @returns A message indicating successful logout.
 */
export const logout = async (userId: string | Types.ObjectId) => {
  // Invalidate the refresh token by removing it from the user's record
  await userModel.findByIdAndUpdate(userId, { refreshToken: null });
  return {
    message: 'User logged out successfully.',
  };
};

/**
 * @description Resend OTP to user's email for email verification.
 * @param email - user's email
 * @returns A message indicating that the OTP has been resent.
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
      subject: 'Your Bora Capitals Advisors otp code',
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
