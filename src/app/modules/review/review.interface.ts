import { Types } from "mongoose";

export interface IReview {
  _id?: string;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number; // 1..5
  title?: string;
  comment?: string;
}
