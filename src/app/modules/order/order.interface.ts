import { Types } from "mongoose";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned"
  | "refunded";

export type IAddress = {
  lat: number;
  lang: number;
};

export interface IOrder {
  _id?: string;
  userId: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    sellerId: Types.ObjectId;
    title?: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: IAddress;
  status: OrderStatus;
  transactionId: string | null;
}
