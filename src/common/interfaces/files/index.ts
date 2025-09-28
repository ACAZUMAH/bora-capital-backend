import { Types } from "mongoose";
import { DocumentsType } from "src/common/enums";

export interface FilesDocument {
  _id: string | Types.ObjectId;
  fileName: string;
  fileType: DocumentsType;
  fileUrl?: string;
  size: number
  mimeType: string
  createdAt: Date
  updatedAt: Date
}
