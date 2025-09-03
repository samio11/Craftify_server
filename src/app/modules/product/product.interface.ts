import { Types } from "mongoose";

export interface IProductAttributes {
  key: string;
  value: string;
}

export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  currency?: string;
  categoryId: Types.ObjectId;
  sellerId: Types.ObjectId;
  images: string[];
  stock: number;
  attributes?: IProductAttributes[];
  ratingAvg?: number;
  reviewsCount?: number;
}
