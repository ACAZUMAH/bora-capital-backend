import { Types } from 'mongoose';
import { DocumentsType } from 'src/common/enums';

export interface DocumentsDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId | string;
  fileName: string;
  documentType: DocumentsType;
  size: number;
  mimeType: string;
  directory: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDocumentInput {
  userId: string | Types.ObjectId;
  fileName: string;
  documentType: DocumentsType;
  size: number;
  mimeType: string;
  directory: string;
}

export interface uploadDocumentInput {
  userId: Types.ObjectId | string;
  file: string;
  directory: string;
  documentType: DocumentsType;
}