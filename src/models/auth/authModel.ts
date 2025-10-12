import { Schema, model } from 'mongoose';
import { Collections, OtpPurpose } from 'src/common/enums';
import { AuthDocument } from 'src/common/interfaces';

const authSchema = new Schema<AuthDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: Collections.Users,
    required: true,
  },
  otp: { type: String, required: true },
  expiresIn: { type: Date },
  otpPurpose: { type: String, enum: Object.values(OtpPurpose), required: true },
});

export const authModel = model<AuthDocument>(Collections.Auth, authSchema);
