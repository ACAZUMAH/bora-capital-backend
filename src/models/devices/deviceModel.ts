import { Schema } from "mongoose";
import { DeviceDocument } from "src/common/interfaces/devices";

export const deviceSchema = new Schema<DeviceDocument>(
  {
    refreshToken: { type: String, required: true },
    deviceId: { type: String, required: true },
    lastUsed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
