import { Schema, model } from "mongoose";
import { UserDocument } from "../../common/interfaces/user";

const userSchema = new Schema<UserDocument>({
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export const userModel = model<UserDocument>("User", userSchema);