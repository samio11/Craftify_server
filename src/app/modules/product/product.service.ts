import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Category } from "../category/category.model";
import { IRole } from "../user/user.interface";
import { User } from "../user/user.model";
import { IProduct } from "./product.interface";
import { Product } from "./products.model";

const createProduct = async (payload: IProduct) => {
  const existCategory = await Category.findById(payload.categoryId);
  if (!existCategory) {
    throw new AppError(401, "This Category is not Exists");
  }
  const existUser = await User.findById(payload.sellerId);
  if (!existUser) {
    throw new AppError(401, "User is not Exists");
  }
  if (existUser?.role !== IRole.seller) {
    throw new AppError(401, "This Seller is not Exists");
  }
  const result = await Product.create(payload);
  return result;
};
const getAllProducts = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Product.find(), query)
    .filter()
    .search(["title"])
    .sort()
    .fields()
    .paginate();
  const result = await queryBuilder.builder();
  return result;
};

export const productServices = { createProduct, getAllProducts };
