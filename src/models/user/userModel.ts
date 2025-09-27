import { Schema, model } from "mongoose";
import { UserDocument } from "../../common/interfaces/user";
import { role } from "src/common/enums";
import { biometricSchema } from "../biometric/biometricModel";
import { deviceSchema } from "../devices/deviceModel";
import { preferencesSchema } from "../preferences/preferencesModel";

const userSchema = new Schema<UserDocument>(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    role: { type: String, enum: Object.values(role) },
    biometric: { type: biometricSchema },
    devices: { type: [deviceSchema], default: [] },
    preferences: { type: preferencesSchema },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const userModel = model<UserDocument>("Users", userSchema);
