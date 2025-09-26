import { Types } from "mongoose";
import { Theme } from "src/common/enums";

export interface userPreferencesDocument {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  theme: Theme;
}
