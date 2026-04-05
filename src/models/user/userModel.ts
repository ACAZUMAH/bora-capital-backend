import { Schema, model } from 'mongoose';
import { UserDocument } from '../../common/interfaces/user';
import { Collections, Gender, KycStatus } from 'src/common/enums';

const userSchema = new Schema<UserDocument>(
  {
    // Auth
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, sparse: true },
    password: { type: String, required: true },
    refreshToken: { type: String },

    // Basic profile (from signup)
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String },
    gender: { type: String, enum: Object.values(Gender) },

    // BCL linking (set after KYC)
    kycStatus: {
      type: String,
      enum: Object.values(KycStatus),
      default: KycStatus.PENDING,
    },
    identityId: { type: String, sparse: true },
    accountNumbers: [{ type: String }],
  },
  { timestamps: true }
);

export const userModel = model<UserDocument>(Collections.Users, userSchema);
