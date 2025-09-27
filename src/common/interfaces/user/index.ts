import { Types } from "mongoose";
import { role } from "src/common/enums";
import { BiometricDocument } from "../biometric";
import { DeviceDocument } from "../devices";
import { PreferencesDocument } from "../preferences";

export interface UserDocument {
  id: string | Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: role;
  biometric?: BiometricDocument
  devices?: [DeviceDocument]
  preferences?: PreferencesDocument
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface createUserInput {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface loginUserInput {
  email: string;
  password: string;
}

export interface resetPasswordInput {
  userId: string | Types.ObjectId;
  newPassword: string;
}
