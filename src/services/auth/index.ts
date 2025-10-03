import { CreateUserInput, loginUserInput } from "src/common/interfaces";
import { checkUserExist, createUser, getUserByEmail } from "../users";
import { comparePassword, hashPassword } from "src/common/helpers";
import { createAuth } from "./auth";
import { sendEmail } from "../notifications";
import { getSendOtpEmailTemplate } from "../notifications/template";
import createError from "http-errors";
import { OtpPurpose } from "src/common/enums";

/**
 * Registers a new user by creating their account, hashing their password, and generating an OTP.
 *
 * @param data - The input data for creating a user, including phone number, email, and password.
 * @returns An object containing the created user and the generated OTP if in development mode.
 * @throws Will throw an error if the phone number or email already exists.
 */
export const register = async (data: CreateUserInput) => {
  const { email, password } = data;

  await checkUserExist(email);

  const hash = await hashPassword(password);
  const user = await createUser({ ...data, password: hash });
  const otp = await createAuth({ userId: user._id!, len: 5, otpPurpose: OtpPurpose.SIGNUP });

  if (user.email) {
    await sendEmail({
      from: "calebazumah9@gmail.com",
      to: user.email,
      subject: "Your Bora Capitals Advisors otp code",
      htmlContent: await getSendOtpEmailTemplate(otp, user.fullName),
    });
  }

  return {
    message: "User created successfully, please check your phone for the OTP.",
  };
};

/**
 * Logs in a user by verifying their credentials and generating an OTP.
 *
 * @param data - The input data for logging in a user, including phone number, email, and password.
 * @returns An object containing the generated OTP if in development mode.
 * @throws Will throw an error if the credentials are invalid.
 */
export const loginUser = async (data: loginUserInput) => {
  const { email, password } = data;

  const user = await getUserByEmail(email);

  if (!user) throw createError.BadRequest("Invalid credentials");

  const isMatch = await comparePassword(password, user?.password);

  if (!isMatch) throw createError.BadRequest("Invalid credentials");

  const otp = await createAuth({ userId: user._id!, len: 5, otpPurpose: OtpPurpose.SIGNIN });

  if (user.email) {
    if(!await sendEmail({
      from: "calebazumah9@gmail.com",
      to: user.email,
      subject: "Your Bora Capitals Advisors otp code",
      htmlContent: await getSendOtpEmailTemplate(otp, user.fullName),
    })) throw createError.InternalServerError("Failed to send OTP code at the moment, please try again later.")
  }

  return {
    message: "Please check your mail for verification code",
  };
};

/**
 * Sends a forgot password OTP to the user's email.
 * @param email - user's email
 * @returns A message indicating that the OTP has been sent.
 * @throws Will throw an error if the user with the provided email does not exist or if sending the email fails.
 */
export const sendForgetPasswordOtp = async (email: string) => {
  const user = await getUserByEmail(email);

  const otp = await createAuth({ userId: user?._id!, len: 5, otpPurpose: OtpPurpose.FORGOT_PASSWORD });

  if (user.email) {
    if(!await sendEmail({
      from: "calebazumah9@gmail.com",
      to: user.email,
      subject: "Bora Capitals Advisors otp code",
      htmlContent: await getSendOtpEmailTemplate(otp, user.fullName),
    })) throw createError.InternalServerError("Failed to send OTP code at the moment, please try again later.")
  }

  return {
    message: "Please check your phone for the OTP to change your password.",
  };
};

export const biometricAuth = async (userId: string) => {}
