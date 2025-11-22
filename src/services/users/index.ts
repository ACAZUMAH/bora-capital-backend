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
import { createPortfolio } from '../portfolio';
import { uploadPhoto } from '../uploads';
import { DocumentsType } from 'src/common/enums';

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

  await createPortfolio({
    userId: user._id,
    name: 'Main Portfolio',
    currency: 'GHS',
  });

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
 * @returns
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
 * @param data.fullName - full name of the user
 * @param data.phoneNumber - phone number of the user
 * @param data.devices - devices of the user
 * @param data.preferences - preferences of the user
 * @param data.biometric - biometric of the user
 * @returns updated user object
 */
export const updateUser = async (data: UpdateUserInput) => {
  const user = await getUserById(data.userId);

  const update: Record<string, any> = {};

  if (data.fullName) update.fullName = data.fullName;
  if (data.phoneNumber) update.phoneNumber = data.phoneNumber;
  if (data.devices?.length) update.devices = data.devices;
  if (data.preferences) update.preferences = data.preferences;
  if (data.biometric) update.biometric = data.biometric;

  if (data.profilePic) {
    const upload = await uploadPhoto({
      userId: user?._id,
      file: data.profilePic,
      documentType: DocumentsType.OTHER,
      directory: 'Profiles',
    });

    update.profile_url = `${process.env.UPLOAD_BASE_URL}/${upload.directory}/${upload.fileName}`;
  }

  const updated = await userModel.findByIdAndUpdate(
    user._id,
    {
      $set: update,
    },
    { new: true }
  );

  return updated;
};
