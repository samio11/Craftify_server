import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Product } from "../product/products.model";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: IReview) => {
  const existProduct = await Product.findById(payload.productId);
  if (!existProduct) {
    throw new AppError(401, "Product is not exists");
  }
  const result = await Review.create(payload);
  return result;
};

const getAllReview = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Review.find(), query)
    .filter()
    .search(["title"])
    .sort()
    .fields()
    .paginate();
  const result = await queryBuilder.builder().populate("productId");
  return result;
};

const updateReview = async (id: string, payload: IReview, userId: string) => {
  const existReview = await Review.findById(id);
  if (!existReview) {
    throw new AppError(401, "Review not found");
  }
  if (userId !== existReview.userId.toString()) {
    throw new AppError(401, "You Cant Update This Review");
  }
  const result = await Review.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteReview = async (id: string, userId: string) => {
  const existReview = await Review.findById(id);
  if (!existReview) {
    throw new AppError(401, "Review not found");
  }
  if (userId !== existReview.userId.toString()) {
    throw new AppError(401, "You Cant Update This Review");
  }
  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const reviewServices = {
  createReview,
  getAllReview,
  updateReview,
  deleteReview,
};
