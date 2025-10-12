import { Types } from 'mongoose';
import { OtpPurpose } from 'src/common/enums';

export interface AuthDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  otp: string;
  otpPurpose: OtpPurpose;
  expiresIn: Date;
}

export interface AuthInput {
  userId: Types.ObjectId | string;
  len: number;
  otpPurpose: OtpPurpose;
}

export interface SigninInput {
  email: string;
  password: string;
}
