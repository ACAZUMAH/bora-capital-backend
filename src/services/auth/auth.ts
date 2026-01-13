import { Types } from 'mongoose';
import { generateOtp, jwtSign, jwtVerify } from 'src/common/helpers';
import { authModel, userModel } from 'src/models';
import createError from 'http-errors';
import { getUserById } from '../users';
import { AuthInput } from 'src/common/interfaces';
import { fetchIdentity } from '../bcl';

/**
 * Creates or updates an authentication record for a user with a unique OTP.
 * @param userId - The ID of the user for whom the OTP is being generated.
 * @param len - The length of the OTP to generate.
 * @returns The generated OTP as a string.
 * @throws Will throw an error if the database operation fails.
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
 * Verifies an OTP, deletes the corresponding authentication record, and generates a JWT token.
 * @param otp - The OTP to verify.
 * @returns An object containing the authenticated user and a signed JWT token.
 * @throws Will throw an error if the OTP is invalid or expired.
 */
export const verifyOtpAndSignJwt = async (otp: string) => {
  const auth = await authModel.findOneAndDelete({ otp });

  if (!auth) throw createError.BadRequest('Invalid otp');

  if (new Date(auth.expiresIn) < new Date())
    throw createError.BadRequest('Otp expired');

  const user = await getUserById(auth.userId);

  if (!user.identityId) throw createError.BadRequest('User identity not found');

  const kycRecords = await fetchIdentity({
    IdentityID: user.identityId,
    PrimaryEmail: user.email,
    MobileNumber: user.phoneNumber!,
  });

  const accessToken = jwtSign({ id: user._id }, 'access');
  const refreshToken = jwtSign({ id: user._id }, 'refresh');

  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  return {
    user: {
      ...user,
      ...kycRecords,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh access token using a valid refresh token.
 * @param refreshToken - The refresh token to validate.
 * @returns An object containing a new access token.
 * @throws Will throw an error if the refresh token is invalid or revoked.
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
