import { Schema } from "mongoose";
import { KycRecordsStatus } from "src/common/enums";
import { KycRecordsDocument } from "src/common/interfaces";

export const kycRecordsSchema = new Schema<KycRecordsDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviewerId: { type: Schema.Types.ObjectId, ref: "User" },
  documentType: { type: String, required: true },
  documentId: { type: Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: Object.values(KycRecordsStatus),
    required: true,
  },
  rejectionReason: { type: String },
  submittedAt: { type: Date, required: true },
  reviewedAt: { type: Date },
});
