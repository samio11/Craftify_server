import { model, Schema } from "mongoose";
import { CART_STATUS, ICart } from "./cart.interface";
import { Product } from "../product/products.model";
import { AppError } from "../../errors/AppError";

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    priceAtAdd: { type: Number, min: 1 },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: {
        values: Object.values(CART_STATUS),
        message: "{VALUE} is not a valid cart status",
      },
      default: CART_STATUS.PENDING,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Cart = model<ICart>("Cart", cartSchema);
