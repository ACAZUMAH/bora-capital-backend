import { Types } from "mongoose";

export interface DeviceDocument {
    _id: string | Types.ObjectId
    refreshToken: string
    deviceId: string
    lastUsed: Date
    createdAt: Date
    updatedAt: Date
}