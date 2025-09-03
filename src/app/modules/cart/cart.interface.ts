import { Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
  priceAtAdd: number;
  quantity: number;
}

export interface ICart {
  _id?: string;
  userId: Types.ObjectId;
  items: ICartItem[];
}
