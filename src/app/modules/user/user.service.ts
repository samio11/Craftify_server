import { AppError } from "../../errors/AppError";
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

export const userServices = { createUser };
