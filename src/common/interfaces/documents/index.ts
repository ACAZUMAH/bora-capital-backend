import { Types } from "mongoose";
import { DocumentsType } from "src/common/enums";

export interface DocumentsDocument {
  _id: string | Types.ObjectId;
  userId: Types.ObjectId | string;
  fileName: string;
  documentType: DocumentsType;
  fileUrl?: string;
  size: number;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}
