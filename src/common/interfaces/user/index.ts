import { Types } from 'mongoose';
import { role } from 'src/common/enums';
import { BiometricDocument } from './biometric';
import { DeviceDocument, DeviceInput } from './devices';
import { PreferencesDocument, PreferencesInput } from './preferences';
//import { KycRecordsDocument } from "../kycRecords";

export interface UserDocument {
  _id: string | Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: role;
  biometric?: BiometricDocument;
  devices?: Array<DeviceDocument>;
  preferences?: PreferencesDocument;
  //kycRecords?: Array<KycRecordsDocument>
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface ResetPasswordInput {
  userId: string | Types.ObjectId;
  newPassword: string;
}

export interface UpdateUserInput {
  userId: string | Types.ObjectId;
  fullName?: string | null;
  phoneNumber?: string | null;
  devices?: Array<DeviceInput> | null;
  preferences?: PreferencesInput | null;
  biometric?: BiometricDocument | null;
}
