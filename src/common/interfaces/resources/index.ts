import { Types } from 'mongoose';

export interface ResourcesDocument {
  _id: string | Types.ObjectId;
  title: string;
  url: string;
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
