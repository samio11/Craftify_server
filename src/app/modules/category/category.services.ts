import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategory = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Category.find(), query)
    .filter()
    .search(["name"])
    .sort()
    .fields()
    .paginate();
  const result = await queryBuilder.builder();
  return result;
};

const updateACategory = async (id: string, payload: Partial<ICategory>) => {
  const duplicateCategory = await Category.findOne({
    name: payload.name,
    _id: { $ne: id },
  });
  if (duplicateCategory) {
    throw new AppError(401, "Category is already exists");
  }
  const result = await Category.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategory,
  updateACategory,
  deleteCategory,
};
