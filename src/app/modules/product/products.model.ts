import { model, Schema } from "mongoose";
import { IProduct, IProductAttributes } from "./product.interface";

const ProductAttribute = new Schema<IProductAttributes>({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true },
    attributes: { type: [ProductAttribute] },
    ratingAvg: { type: Number, required: true },
    reviewsCount: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Product = model<IProduct>("Product", productSchema);
