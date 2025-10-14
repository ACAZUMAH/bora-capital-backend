import { model, Schema } from 'mongoose';
import { Collections, KycRecordsStatus } from 'src/common/enums';
import { KycRecordsDocument } from 'src/common/interfaces';

export const kycRecordsSchema = new Schema<KycRecordsDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: Collections.Users,
    required: true,
  },
  reviewerId: { type: Schema.Types.ObjectId, ref: Collections.Users },
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

export const kycRecordsModel = model<KycRecordsDocument>(
  Collections.KycRecords,
  kycRecordsSchema
);
