import { Types } from "mongoose";

export interface digitalSignature {
  _id: string | Types.ObjectId;
  documentId: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  signatureUrl: string;
  signedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
