import { model, Schema } from "mongoose";
import { DocumentsType } from "src/common/enums";
import { FilesDocument } from "src/common/interfaces";

const filesSchema = new Schema<FilesDocument>({
  fileName: { type: String, required: true },
  fileType: { type: String, enum: Object.values(DocumentsType), required: true },
  fileUrl: { type: String },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
}, { timestamps: true });

export const uploadsSchema = model<FilesDocument>("Files", filesSchema); 