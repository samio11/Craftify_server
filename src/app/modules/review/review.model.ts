import { model, Schema } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true, min: 3 },
    comment: { type: String, required: true, min: [3, "Must be more than 3"] },
  },
  { timestamps: true, versionKey: false }
);

export const Review = model<IReview>("Review", reviewSchema);
