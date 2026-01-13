import { Types } from 'mongoose';
import createError from 'http-errors';
import { userModel } from 'src/models';
import { getUserById } from './index';
import { addIndividualIdentity, fetchIdentity } from '../bcl';
import { KycStatus } from 'src/common/enums';
import { KycRecordsInput, UserDocument } from 'src/common/interfaces';
import { rollbar } from 'src/loggers/rollbar';
import logger from 'src/loggers/logger';

/**
 * @description Submit/Update KYC data for a user.
 * Merges existing user data with KYC fields and sends to BCL API.
 */
export const updateKycRecords = async (data: KycRecordsInput) => {
  const user = await getUserById(data.userId);

  // Check if KYC already submitted
  if (user.identityId) {
    throw createError.BadRequest('KYC already submitted for this user');
  }

  if (!user.phoneNumber) {
    throw createError.BadRequest('Phone number is required for KYC submission');
  }

  try {
    // Merge user signup data with KYC data and call BCL API
    const identityId = await addIndividualIdentity({
      FirstName: user.firstName,
      MiddleName: data.middleName,
      LastName: user.lastName,
      Gender: user.gender,
      Title: data.title,
      DateOfBirth: user.dateOfBirth,
      ResidencyStatus: data.residencyStatus,
      PassPortNumber: data.passportNumber,
      IDNumber: data.idNumber,
      MaritalStatus: data.maritalStatus,
      SourceOfFunds: data.sourceOfFunds,
      SpouseName: data.spouseName,
      Occupation: data.occupation,
      NextOfKin: data.nextOfKin,
      PostalAddress: data.postalAddress,
      NationalityCountryCode: data.nationalityCountryCode,
      ResidencyCountryCode: data.residencyCountryCode,
      CurrencyCode: data.currencyCode,
      PhysicalAddress: data.physicalAddress,
      MobileNumber: user.phoneNumber!,
      PrimaryEmail: user.email,
      PinNumber: data.pinNumber,
    });

    // Update user with identityId and kycStatus
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        identityId,
        kycStatus: KycStatus.SUBMITTED,
      },
      { new: true }
    );

    return updatedUser;
  } catch (error: any) {
    rollbar.error('KYC submission failed', { error, userId: data.userId });
    throw createError.BadRequest(
      error.message || 'Failed to submit KYC. Please try again.'
    );
  }
};

/**
 * @description Fetch KYC records from BCL for a user.
 * Returns null if user hasn't completed KYC yet.
 */
export const getKycRecords = async (user: UserDocument) => {
  // Return null if no identityId (KYC not submitted)
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

    return {
      middleName: kycData?.MiddleName,
      title: kycData?.Title,
      residencyStatus: kycData?.ResidencyStatus,
      passportNumber: kycData?.PassPortNumber,
      idNumber: kycData?.IDNumber,
      maritalStatus: kycData?.MaritalStatus,
      sourceOfFunds: kycData?.SourceOfFunds,
      spouseName: kycData?.SpouseName,
      occupation: kycData?.Occupation,
      nextOfKin: kycData?.NextOfKin,
      postalAddress: kycData?.PostalAddress,
      nationalityCountryCode: kycData?.NationalityCountryCode,
      residencyCountryCode: kycData?.ResidencyCountryCode,
      currencyCode: kycData?.CurrencyCode,
      physicalAddress: kycData?.PhysicalAddress,
      pinNumber: kycData?.PinNumber,
    };
  } catch (error: any) {
    rollbar.error('Failed to fetch KYC records', { error, userId: user._id });
    return null;
  }
};
