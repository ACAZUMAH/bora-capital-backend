import { Types } from 'mongoose';
import { KycStatus, role } from 'src/common/enums';

export interface UserDocument {
  _id: string | Types.ObjectId;
  // Auth
  email: string;
  phoneNumber?: string;
  password: string;
  role: role;
  refreshToken?: string;

  // Basic profile (from signup)
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;

  // BCL linking (set after KYC)
  kycStatus: KycStatus;
  identityId?: string;
  accountNumbers?: string[];

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  phoneNumber?: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}

export interface KycRecordsInput {
  userId: string | Types.ObjectId;
  residencyStatus: string;
  idNumber: string;
  sourceOfFunds: string;
  occupation: string;
  nextOfKin: string;
  postalAddress: string;
  nationalityCountryCode: string;
  residencyCountryCode: string;
  currencyCode: string;
  physicalAddress: string;
  // Optional
  middleName?: string | null;
  title?: string | null;
  passportNumber?: string | null;
  maritalStatus?: string | null;
  spouseName?: string | null;
  pinNumber?: string | null;
}

export interface ResetPasswordInput {
  userId: string | Types.ObjectId;
  newPassword: string;
}

export interface UpdateUserInput {
  userId: string | Types.ObjectId;
  phoneNumber?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  kycStatus?: KycStatus | null;
}
