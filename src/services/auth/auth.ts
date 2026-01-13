import { Types } from 'mongoose';
import { generateOtp, jwtSign, jwtVerify } from 'src/common/helpers';
import { authModel, userModel } from 'src/models';
import createError from 'http-errors';
import { getUserById } from '../users';
import { AuthInput } from 'src/common/interfaces';

/**
 * Creates or updates an authentication record for a user with a unique OTP.
 */
export const createAuth = async (data: AuthInput) => {
  let otp = generateOtp(data.len);
  while (await authModel.exists({ otp })) {
    otp = generateOtp(data.len);
  }
  const expiresIn = new Date(Date.now() + 1 * 60 * 60 * 1000);

  await authModel.findOneAndUpdate(
    { userId: data.userId },
    { userId: data.userId, otp, expiresIn, otpPurpose: data.otpPurpose },
    { upsert: true }
  );

  return otp;
};

/**
 * Verifies an OTP and generates JWT tokens.
 * User can complete auth without KYC - they'll have limited access.
 */
export const verifyOtpAndSignJwt = async (otp: string) => {
  const auth = await authModel.findOneAndDelete({ otp });

  if (!auth) throw createError.BadRequest('Invalid OTP');

  if (new Date(auth.expiresIn) < new Date())
    throw createError.BadRequest('OTP expired');

  const user = await getUserById(auth.userId);

  const accessToken = jwtSign({ id: user._id }, 'access');
  const refreshToken = jwtSign({ id: user._id }, 'refresh');

  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  return { user, accessToken, refreshToken };
};

/**
 * Refresh access token using a valid refresh token.
 */
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const data: any = jwtVerify(refreshToken, 'refresh');

    if (!data?.id) throw createError.Unauthorized('Invalid refresh token');

    const user = await getUserById(data.id);

    if (user.refreshToken !== refreshToken) {
      throw createError.Unauthorized('Refresh token has been revoked');
    }

    const newAccessToken = jwtSign({ id: user._id }, 'access');

    return { accessToken: newAccessToken };
  } catch (error: any) {
    throw createError.Unauthorized(error.message || 'Invalid refresh token');
  }
};
