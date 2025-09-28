import { model, Schema } from "mongoose";
import { digitalSignature } from "src/common/interfaces";

const digitalSignatureSchema = new Schema<digitalSignature>({
  documentId: { type: Schema.Types.ObjectId, ref: "Documents", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  signatureUrl: { type: String, required: true },
  signedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const SignatureModel = model<digitalSignature>(
  "Signatures",
  digitalSignatureSchema
);