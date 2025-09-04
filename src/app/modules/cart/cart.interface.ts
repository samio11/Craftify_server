import { Types } from "mongoose";

export enum CART_STATUS {
  PENDING = "PENDING",
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
}

export interface ICart {
  _id?: string;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  priceAtAdd: number;
  quantity: number;
  status: CART_STATUS;
}
