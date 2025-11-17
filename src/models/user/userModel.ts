import { Schema, model } from 'mongoose';
import { UserDocument } from '../../common/interfaces/user';
import { Collections, role } from 'src/common/enums';
import { biometricSchema } from '../biometric/biometricModel';
import { deviceSchema } from '../devices/deviceModel';
import { preferencesSchema } from '../preferences/preferencesModel';

const userSchema = new Schema<UserDocument>(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    profile_url: {},
    phoneNumber: { type: String, unique: true },
    role: { type: String, enum: Object.values(role), default: role.CLIENT },
    biometric: biometricSchema,
    devices: [deviceSchema],
    preferences: preferencesSchema,
    password: { type: String, required: true },

    advisors: [{ type: Schema.Types.ObjectId, ref: Collections.Users }],

    clients: [{ type: Schema.Types.ObjectId, ref: Collections.Users }],
  },
  { timestamps: true }
);

export const userModel = model<UserDocument>(Collections.Users, userSchema);
