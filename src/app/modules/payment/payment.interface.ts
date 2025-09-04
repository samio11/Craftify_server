import { Types } from "mongoose";

export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
}

export interface IPayment {
  _id?: string;
  cartId: Types.ObjectId;
  transection_id: string;
  amount: number;
  invoiceUrl?: string;
  status: string;
}
