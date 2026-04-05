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
  expiresIn: { type: Date, index: { expires: 0 } },
  otpPurpose: { type: String, enum: Object.values(OtpPurpose), required: true },
  attempts: { type: Number, default: 0 },
});

export const authModel = model<AuthDocument>(Collections.Auth, authSchema);
