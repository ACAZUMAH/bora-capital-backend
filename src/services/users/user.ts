import {
  CreateUserInput,
  KycRecordsInput,
  ResetPasswordInput,
  UpdateUserInput,
  UserDocument,
} from 'src/common/interfaces';
import { validateCreateUserData } from './validations/validateSignUpData';
import { userModel } from 'src/models';
import { Types } from 'mongoose';
import createError from 'http-errors';
import { hashPassword } from 'src/common/helpers';
import { addIndividualIdentity, fetchIdentity } from './kyc.service';
import { formatPayload, formatResponse } from './helper';
import { KycStatus } from 'src/common/enums';
import { rollbar } from 'src/loggers/rollbar';
import logger from 'src/loggers/logger';

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

/**
 * @description Submit/Update KYC data for a user.
 * @param data.userId - id of the user
 * @param data.firstName - first name of the user
 * @param data.lastName - last name of the user
 * @param data.dateOfBirth - date of birth of the user
 * @param data.gender - gender of the user
 * @param data.kycStatus - kyc status of the user
 * Merges existing user data with KYC fields and sends to BCL API.
 */
export const updateKycRecords = async (data: KycRecordsInput) => {
  const user = await getUserById(data.userId);

  try {
    if (user.identityId) {
      throw createError.BadRequest('KYC already submitted for this user');
    }

    if (!user.phoneNumber) {
      throw createError.BadRequest(
        'Phone number is required for KYC submission'
      );
    }

    const payload = formatPayload(user, data);
    const identityId = await addIndividualIdentity({ ...payload });

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: user._id, identityId: { $exists: false } },
      { $set: { identityId, kycStatus: KycStatus.APPROVED } },
      { new: true }
    );

    if (!updatedUser) {
      throw createError.Conflict('KYC already submitted for this user');
    }

    return updatedUser;
  } catch (error: any) {
    rollbar.error('KYC submission failed', { error, userId: data.userId });
    logger.error('KYC submission failed', { error, userId: data.userId });
    throw createError.BadGateway(
      error.message || 'Failed to submit KYC. Please try again.'
    );
  }
};

/**
 * @description Fetch KYC records from BCL for a user.
 * @param user - user object
 * Returns null if user hasn't completed KYC yet.
 */
export const getKycRecords = async (user: UserDocument) => {
  if (!user.identityId) {
    return null;
  }

  try {
    const kycData = await fetchIdentity({
      IdentityID: user.identityId,
      PrimaryEmail: user.email,
      MobileNumber: user.phoneNumber || '',
    });

    if (!kycData) {
      logger.warn('KYC records not found for user', { userId: user._id });
      return null;
    }

    if (user.kycStatus !== KycStatus.APPROVED) {
      await userModel.findByIdAndUpdate(user._id, {
        kycStatus: KycStatus.APPROVED,
      });
    }

    return formatResponse(kycData);
  } catch (error: any) {
    logger.error('Error fetching KYC records:', error.message, error);
    rollbar.error('Failed to fetch KYC records', { error, userId: user._id });
    return null;
  }
};
