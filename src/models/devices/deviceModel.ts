import { Schema } from "mongoose";
import { DeviceDocument } from "src/common/interfaces";

export const deviceSchema = new Schema<DeviceDocument>(
  {
    refreshToken: { type: String, required: true },
    deviceId: { type: String, required: true },
    lastUsed: { type: Date, default: Date.now },
  },
  { _id: false, timestamps: true }
);
