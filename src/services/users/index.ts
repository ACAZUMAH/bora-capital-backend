import { createUserInput, resetPasswordInput } from "src/common/interfaces";
import { validateCreateUserData } from "./validations/validateSignUpData";
import { userModel } from "src/models";
import { Types } from "mongoose";
import createError from "http-errors";
import { hashPassword } from "src/common/helpers";

export const createUser = async (data: createUserInput) => {
  validateCreateUserData(data);

  const user = await userModel.create({ ...data });

  return user;
};

export const checkUserExist = async (email: string) => {
  if (await userModel.exists({ email })) {
    throw createError.Conflict("Email already exists");
  }
};

export const getUserById = async (id: Types.ObjectId | string) => {
  if (!Types.ObjectId.isValid(id))
    throw createError.BadRequest("Invalid user ID");

  const user = await userModel.findById(id).select("-password");

  if (!user) throw createError.NotFound("User not found");

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });

  if (!user) throw createError.NotFound("User not found");

  return user;
};

export const resetPassword = async (data: resetPasswordInput) => {
  const { userId, newPassword } = data;

  if (!Types.ObjectId.isValid(userId))
    throw createError.BadRequest("Invalid user ID");

  const hash = await hashPassword(newPassword);

  const user = await userModel.findByIdAndUpdate(
    userId,
    { password: hash },
    { new: true }
  );

  if (!user) throw createError.NotFound("User not found");

  return { message: "Password reset successfully" };
};
