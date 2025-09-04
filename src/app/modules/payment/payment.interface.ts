export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
}

export interface IPayment {
  _id?: string;
  cartId: string;
  transection_id: string;
  amount: string;
  invoiceUrl: string;
  status: string;
}
