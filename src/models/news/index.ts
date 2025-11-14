import { model, Schema } from 'mongoose';
import { Collections } from 'src/common/enums';
import { MarketNewsDocument } from 'src/common/interfaces/news';

const newsSchema = new Schema<MarketNewsDocument>(
  {
    title: { type: String, required: true },
    source: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String },
    content: { type: String },
    author: { type: String, required: true },
    publishedAt: { type: String, required: true },
    tag: [{ type: String }],
  },
  { timestamps: true }
);

export const MarketNewsModel = model<MarketNewsDocument>(
  Collections.MarketNews,
  newsSchema
);
