import { Schema, model, Document } from "mongoose";

export interface IFavorite extends Document {
  userId: string;
  videoId: string;
  createdAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: String, required: true },
    videoId: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

favoriteSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const Favorite = model<IFavorite>("Favorite", favoriteSchema);