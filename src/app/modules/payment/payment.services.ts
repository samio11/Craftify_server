import { AppError } from "../../errors/AppError";
import { CART_STATUS } from "../cart/cart.interface";
import { Cart } from "../cart/cart.model";
import { Product } from "../product/products.model";
import { SSLService } from "../sslCommerz/sslCommer.service";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const initPayment = async (cartId: string) => {
  const existPayment = await Payment.findOne({ cartId });
  if (!existPayment) {
    throw new AppError(401, "Order is not found");
  }
  const existCart = await Cart.findById(cartId).populate("userId");

  const userName = (existCart?.userId as any).name;
  const userEmail = (existCart?.userId as any).email;
  const userPhoneNumber = (existCart?.userId as any).phoneNumber;

  const sslCommerzPayload: ISSLCommerz = {
    amount: existPayment?.amount,
    transactionId: existPayment?.transection_id,
    name: userName,
    email: userEmail,
    phoneNumber: userPhoneNumber,
  };
  //   console.log(sslCommerzPayload);
  const sslCommerz = await SSLService.sslPaymentInit(sslCommerzPayload);

  return {
    payment_url: sslCommerz?.GatewayPageURL,
  };
};

const successPayment = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();
  try {
    const updatepayment = await Payment.findOneAndUpdate(
      { transection_id: query?.transactionId },
      { status: PAYMENT_STATUS.COMPLETE },
      { new: true, session }
    );
    const updateCart = await Cart.findOneAndUpdate(
      { _id: updatepayment?.cartId },
      { status: CART_STATUS.COMPLETE },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      message: "Payment Created Done",
      success: true,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
const failPayment = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();
  try {
    const updatepayment = await Payment.findOneAndUpdate(
      { transection_id: query?.transactionId },
      { status: PAYMENT_STATUS.FAILED },
      { new: true, session }
    );
    const updateCart = await Cart.findOneAndUpdate(
      { _id: updatepayment?.cartId },
      { status: CART_STATUS.FAILED },
      { new: true, session }
    );
    await Product.findByIdAndUpdate(
      updateCart?.productId,
      { $inc: { stock: updateCart?.quantity } },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      message: "Payment Failed",
      success: true,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
const cancelPayment = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();
  try {
    const updatepayment = await Payment.findOneAndUpdate(
      { transection_id: query?.transactionId },
      { status: PAYMENT_STATUS.CANCEL },
      { new: true, session }
    );
    const updateCart = await Cart.findOneAndUpdate(
      { _id: updatepayment?.cartId },
      { status: CART_STATUS.CANCEL },
      { new: true, session }
    );
    await Product.findByIdAndUpdate(
      updateCart?.productId,
      { $inc: { stock: updateCart?.quantity } },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      message: "Payment Canceled",
      success: true,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const getAllPaymentData = async () => {
  const result = await Payment.find().populate("cartId");
  return result;
};

export const paymentServices = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
  getAllPaymentData,
};
