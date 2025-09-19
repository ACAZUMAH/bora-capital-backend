import { Request, Response } from "express";
import { constructHTTPResponse } from "src/common/helpers";
import { forgetPasswordOtp, loginUser, register } from "src/services/auth";
import { verifyOtpAndSignJwt } from "src/services/auth/auth";
import { resetPassword } from "src/services/users";

export const signUpUser = async (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, password } = req.body;

  const response = await register({ fullName, email, phoneNumber, password });

  return res.status(201).json(constructHTTPResponse(response));
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const response = await loginUser({ email, password });

  return res.status(200).json(constructHTTPResponse(response));
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const response = await forgetPasswordOtp(email);

  return res.status(200).json(constructHTTPResponse(response));
};

export const resetUserPassword = async (req: Request, res: Response) => {
  const response = await resetPassword({
    userId: req.user._id,
    newPassword: req.body.newPassword,
  });

  return res.status(200).json(constructHTTPResponse(response));
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { otp } = req.body;

  const response = await verifyOtpAndSignJwt(otp);

  return res.status(200).json(constructHTTPResponse(response));
};
