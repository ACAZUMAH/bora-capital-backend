import { model, Schema } from "mongoose";
import { Collections, DocumentsType } from "src/common/enums";
import { DocumentsDocument } from "src/common/interfaces";

const documentsSchema = new Schema<DocumentsDocument>({
  fileName: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: Collections.Users, required: true },
  documentType: { type: String, enum: Object.values(DocumentsType), required: true },
  fileUrl: { type: String },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
}, { timestamps: true });

export const uploadsSchema = model<DocumentsDocument>(Collections.Documents, documentsSchema); 