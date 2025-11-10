import { Types } from 'mongoose';
import { role } from 'src/common/enums';
import { BiometricDocument } from './biometric';
import { DeviceDocument, DeviceInput } from './devices';
import { PreferencesDocument, PreferencesInput } from './preferences';

export interface UserDocument {
  _id: string | Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: role;
  biometric?: BiometricDocument;
  devices?: Array<DeviceDocument>;
  preferences?: PreferencesDocument;
  refreshToken?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  advisors?: Array<string | Types.ObjectId>;
  clients?: Array<string | Types.ObjectId>;
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
