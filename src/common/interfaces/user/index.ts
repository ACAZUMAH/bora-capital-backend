import { Types } from 'mongoose';
import { role } from 'src/common/enums';

export interface UserDocument {
  _id: string | Types.ObjectId;
  email: string;
  identityId?: string;
  accountNumbers?: string[];
  phoneNumber?: string;
  role: role;
  refreshToken?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * BCL Relation/Beneficiary for KYC
 */
export interface BclRelationInput {
  relationshipId: string;
  name: string;
  email: string;
  phoneNumber: string;
  idNumber: string;
  dob: string;
  beneficiaryPercentage: string;
}

/**
 * Extended signup input with BCL KYC data
 */
export interface CreateUserInput {
  // Auth fields
  email: string;
  phoneNumber?: string;
  password: string;

  // BCL KYC fields
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  title?: string;
  dateOfBirth: string;
  residencyStatus: string;
  passportNumber?: string;
  idNumber: string;
  maritalStatus?: string;
  sourceOfFunds: string;
  spouseName?: string;
  occupation: string;
  nextOfKin: string;
  postalAddress: string;
  nationalityCountryCode: string;
  residencyCountryCode: string;
  currencyCode: string;
  physicalAddress: string;
  pinNumber?: string;
  relations?: BclRelationInput[];
}

export interface ResetPasswordInput {
  userId: string | Types.ObjectId;
  newPassword: string;
}

export interface UpdateUserInput {
  userId: string | Types.ObjectId;
  phoneNumber?: string | null;
}
