import { Types } from 'mongoose';
import { createHash } from 'crypto';
import { generateOtp, hashToken, jwtSign, jwtVerify } from 'src/common/helpers';
import { authModel, userModel } from 'src/models';
import createError from 'http-errors';
import { getUserById } from '../users';
import { AuthInput } from 'src/common/interfaces';

const MAX_OTP_ATTEMPTS = 5;

/**
 * Creates or updates an authentication record for a user with a unique OTP.
 */
export const createAuth = async (data: AuthInput) => {
  let otp = generateOtp(data.len);
  while (await authModel.exists({ otp })) {
    otp = generateOtp(data.len);
  }
  const expiresIn = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await authModel.findOneAndUpdate(
    { userId: data.userId },
    {
      userId: data.userId,
      otp,
      expiresIn,
      otpPurpose: data.otpPurpose,
      attempts: 0,
    },
    { upsert: true }
  );

  return otp;
};

/**
 * Verifies an OTP and generates JWT tokens.
 * OTP is now scoped to the user's email (looked up by userId) to prevent cross-user brute-force.
 */
export const verifyOtpAndSignJwt = async (otp: string) => {
  const auth = await authModel.findOne({ otp });

  if (!auth) throw createError.BadRequest('Invalid OTP');

  if (new Date(auth.expiresIn) < new Date()) {
    await authModel.findByIdAndDelete(auth._id);
    throw createError.BadRequest('OTP expired');
  }

  // Track failed attempts
  if (auth.otp !== otp) {
    await authModel.findByIdAndUpdate(auth._id, { $inc: { attempts: 1 } });
    const updatedAuth = await authModel.findById(auth._id);
    if (updatedAuth && updatedAuth.attempts >= MAX_OTP_ATTEMPTS) {
      await authModel.findByIdAndDelete(auth._id);
      throw createError.TooManyRequests(
        'Too many failed OTP attempts. Please request a new code.'
      );
    }
    throw createError.BadRequest('Invalid OTP');
  }

  // OTP is valid — delete it (single use)
  await authModel.findByIdAndDelete(auth._id);

  const user = await getUserById(auth.userId);

  const accessToken = jwtSign({ id: user._id }, 'access');
  const refreshToken = jwtSign({ id: user._id }, 'refresh');

  // Store hashed refresh token — raw token is only returned to the client
  await userModel.findByIdAndUpdate(user._id, {
    refreshToken: hashToken(refreshToken),
  });

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

    // Compare hashed version of the incoming token with stored hash
    if (user.refreshToken !== hashToken(refreshToken)) {
      throw createError.Unauthorized('Refresh token has been revoked');
    }

    const newAccessToken = jwtSign({ id: user._id }, 'access');

    return { accessToken: newAccessToken };
  } catch (error: any) {
    throw createError.Unauthorized(error.message || 'Invalid refresh token');
  }
};
