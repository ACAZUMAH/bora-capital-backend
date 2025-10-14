import { Types } from 'mongoose';
import { generateOtp, jwtSign } from 'src/common/helpers';
import { authModel } from 'src/models';
import createError from 'http-errors';
import { getUserById } from '../users';
import { AuthInput } from 'src/common/interfaces';
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

  const token = jwtSign({ id: user._id });

  return { user, token };
};
