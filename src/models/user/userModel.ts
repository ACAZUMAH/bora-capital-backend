import { Schema, model } from 'mongoose';
import { UserDocument } from '../../common/interfaces/user';
import { Collections, role } from 'src/common/enums';

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    identityId: { type: String, sparse: true },
    accountNumbers: [{ type: String }],
    phoneNumber: { type: String, unique: true, sparse: true, required: true },
    role: { type: String, enum: Object.values(role), default: role.CLIENT },
    password: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const userModel = model<UserDocument>(Collections.Users, userSchema);
