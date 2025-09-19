import { Schema, model } from "mongoose";
import { AuthDocument } from "src/common/interfaces/auth";

const authSchema = new Schema<AuthDocument>({
    userId: { type: Schema.Types.ObjectId, required: true },
    otp: { type: String, required: true },
    expiresIn: { type: Date }
})

export const authModel = model<AuthDocument>("auth", authSchema)