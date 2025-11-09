// backend/src/models/Url.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IUrl extends Document {
  user: Types.ObjectId;
  originalUrl: string;
  shortId: string;
  visits: number;
  createdAt: Date;
  updatedAt: Date;
}

const UrlSchema = new Schema<IUrl>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    visits: { type: Number, default: 0 },
  },
  { timestamps: true } 
);

export default model<IUrl>('Url', UrlSchema);
