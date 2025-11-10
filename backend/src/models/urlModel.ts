// backend/src/models/Url.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IUrl extends Document {
  _id: Types.ObjectId; 
  userId: Types.ObjectId;
  originalUrl: string;
  shortId: string;
  shortUrl:string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const UrlSchema = new Schema<IUrl>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true } 
);

export const UrlModel= model<IUrl>('Url', UrlSchema);
