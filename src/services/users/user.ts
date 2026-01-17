import {
  CreateUserInput,
  ResetPasswordInput,
  UpdateUserInput,
} from 'src/common/interfaces';
import { validateCreateUserData } from './validations/validateSignUpData';
import { userModel } from 'src/models';
import { Types } from 'mongoose';
import createError from 'http-errors';
import { hashPassword } from 'src/common/helpers';

/**
 * @description create new user (local database only)
 * @param data.email - email of the user
 * @param data.phoneNumber - phone number of the user
 * @param data.password - password of the user
 * @returns created user object
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
    throw createError.Conflict('Email already exists');
  }
};

/**
 * @description get user by id
 * @param id - user id
 * @returns user object
 */
export const getUserById = async (id: string | Types.ObjectId) => {
  if (!Types.ObjectId.isValid(id))
    throw createError.BadRequest('Invalid user ID');

  const user = await userModel.findById(id).select('-password');

  if (!user) throw createError.NotFound('User not found');

  return user;
};

/**
 * @description get user by email
 * @param email - email of the user
 * @returns user object
 */
export const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });

  if (!user) throw createError.NotFound('User not found');

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
    throw createError.BadRequest('Invalid user ID');

  const hash = await hashPassword(newPassword);

  const user = await userModel.findByIdAndUpdate(
    userId,
    { password: hash },
    { new: true }
  );

  if (!user) throw createError.NotFound('User not found');

  return { message: 'Password reset successfully' };
};

/**
 * @description update user details
 * @param data.userId - id of the user
 * @param data.phoneNumber - phone number of the user
 * @returns updated user object
 */
export const updateUser = async (data: UpdateUserInput) => {
  const user = await getUserById(data.userId);

  const update: Record<string, any> = {
    ...(data.firstName && { firstName: data.firstName }),
    ...(data.lastName && { lastName: data.lastName }),
    ...(data.dateOfBirth && { dateOfBirth: data.dateOfBirth }),
    ...(data.gender && { gender: data.gender }),
    ...(data.kycStatus && { kycStatus: data.kycStatus }),
  };

  const updated = await userModel.findByIdAndUpdate(
    user._id,
    { $set: update },
    { new: true }
  );

  return updated;
};

/**
 * @description Link BCL IdentityID to user
 * @param userId - user id
 * @param identityId - BCL IdentityID
 * @returns updated user object
 */
export const linkIdentityId = async (
  userId: string | Types.ObjectId,
  identityId: string
) => {
  const user = await getUserById(userId);

  const updated = await userModel.findByIdAndUpdate(
    user._id,
    { identityId },
    { new: true }
  );

  return updated;
};

/**
 * @description Link BCL AccountNumber to user
 * @param userId - user id
 * @param accountNumber - BCL Account Number
 * @returns updated user object
 */
export const linkAccountNumber = async (
  userId: string | Types.ObjectId,
  accountNumber: string
) => {
  const user = await getUserById(userId);

  // Add to array if not already present
  const updated = await userModel.findByIdAndUpdate(
    user._id,
    { $addToSet: { accountNumbers: accountNumber } },
    { new: true }
  );

  return updated;
};
