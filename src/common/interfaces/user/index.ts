import { Types } from "mongoose";

export interface UserDocument {
    id: string | Types.ObjectId;
    fullName: string;
    email: string;
    phoneNumber?: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface createUserInput {
    fullName: string;
    email: string;
    phoneNumber?: string;
    password: string;
}

export interface loginUserInput {
    email: string;
    password: string
}

export interface resetPasswordInput {
    userId: string | Types.ObjectId;
    newPassword: string;
}