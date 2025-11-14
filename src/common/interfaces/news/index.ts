import { Types } from 'mongoose';

export interface MarketNewsDocument {
  _id: Types.ObjectId;
  title: string;
  source: string;
  url: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  tag: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateMarketNews {
    title: string;
    source: string;
    url: string;
    summary: string;
    content: string;
    author: string;
    publishedAt: string;
    tag?: string;
}
