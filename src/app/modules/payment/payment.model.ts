import { model, Schema } from "mongoose";
import { IPayment } from "./payment.interface";

const paymentSchema = new Schema<IPayment>({
  cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  transection_id: { type: String, required: true },
  amount: { type: Number },

  status: { type: String },
});

export const Payment = model<IPayment>("Payment", paymentSchema);
