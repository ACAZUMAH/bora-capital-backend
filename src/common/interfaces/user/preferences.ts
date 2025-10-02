import { Types } from "mongoose";
import { Theme } from "src/common/enums";

export interface PreferencesDocument {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  theme: Theme;
  currency: string;
  language: string;
  timezone: string;
  notificationsEnabled: boolean;
}

export interface PreferencesInput {
  theme?: Theme;
  currency?: string;
  language?: string;
  timezone?: string;
  notificationsEnabled?: boolean;
}