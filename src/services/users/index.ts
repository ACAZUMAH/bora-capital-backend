import {
  CreateUserInput,
  ResetPasswordInput,
  UpdateUserInput,
} from "src/common/interfaces";
import { validateCreateUserData } from "./validations/validateSignUpData";
import { userModel } from "src/models";
import { Types } from "mongoose";
import createError from "http-errors";
import { hashPassword } from "src/common/helpers";

/**
 * @description create new user
 * @param data.fullName - full name of the user
 * @param data.email - email of the user
 * @param data.phoneNumber - phone number of the user
 * @param data.password - password of the user
 * @returns
 */
export const createUser = async (data: CreateUserInput) => {
  validateCreateUserData(data);

  const user = await userModel.create({ ...data });

  return user;
};

/**
 * @description check if user with email already exists
 * @param email - email of the user to check
 * @throws Will throw an error if the email already exists
 */
export const checkUserExist = async (email: string) => {
  if (await userModel.exists({ email })) {
    throw createError.Conflict("Email already exists");
  }
};

/**
 * @description get user by id
 * @param id - user id
 * @returns user object
 */
export const getUserById = async (id: Types.ObjectId | string) => {
  if (!Types.ObjectId.isValid(id))
    throw createError.BadRequest("Invalid user ID");

  const user = await userModel.findById(id).select("-password");

  if (!user) throw createError.NotFound("User not found");

  return user;
};

/**
 * @description get user by email
 * @param email - email of the user
 * @returns
 */
export const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });

  if (!user) throw createError.NotFound("User not found");

  return user;
};

/**
 * @description reset user password
 * @param data.userId - id of the user
 * @param data.newPassword - new password of the user
 * @returns update message
 */
export const resetPassword = async (data: ResetPasswordInput) => {
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

/**
 *
 */
export const updateUser = async (data: UpdateUserInput) => {};
