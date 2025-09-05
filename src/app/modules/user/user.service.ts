import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: IUser) => {
  const existUser = await User.findOne({ email: payload.email });
  if (existUser) {
    throw new AppError(401, "User is already exits");
  }
  const result = await User.create(payload);
  return result;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const duplicateUser = await User.findOne({
    name: payload.name,
    _id: { $ne: id },
  });
  if (duplicateUser) {
    throw new AppError(401, "User is already exists");
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getALlUSer = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query)
    .filter()
    .search(["name", "email", "role"])
    .sort()
    .fields()
    .paginate();
  const result = await queryBuilder.builder();
  return result;
};

const getUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const userServices = { createUser, updateUser, getALlUSer, getUser };
