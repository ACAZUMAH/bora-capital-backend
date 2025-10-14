import { Types } from 'mongoose';
import { DocumentsType, KycRecordsStatus } from 'src/common/enums';

export interface KycRecordsDocument {
  userId: string | Types.ObjectId;
  reviewerId?: string | Types.ObjectId;
  documentType: DocumentsType;
  documentId: string | Types.ObjectId;
  status: KycRecordsStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
