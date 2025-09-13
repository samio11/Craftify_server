import { AppError } from "../../errors/AppError";
import { generateTransictionId } from "../../utils/generateTransictionId";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IPayment, PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { Product } from "../product/products.model";
import { SSLService } from "../sslCommerz/sslCommer.service";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";

const createCart = async (payload: ICart) => {
  const existProduct = await Product.findById(payload.productId);
  if (!existProduct) {
    throw new AppError(401, "Products is not exists");
  }
  const session = await Cart.startSession();
  session.startTransaction();
  try {
    const newCart = await Cart.create([payload], { session });
    const productTotalPrice =
      Number(payload.priceAtAdd) * Number(payload.quantity);

    console.log(
      productTotalPrice,
      Number(payload.priceAtAdd),
      Number(payload.quantity)
    );

    const transectionId = generateTransictionId();

    // Decrease Product
    await Product.findByIdAndUpdate(
      payload.productId,
      { $inc: { stock: -newCart[0].quantity } },
      { new: true, session }
    );

    const newPayment = await Payment.create(
      [
        {
          cartId: newCart[0]?._id,
          transection_id: transectionId,
          amount: productTotalPrice,
          status: PAYMENT_STATUS.PENDING,
        },
      ],
      { session }
    );

    const updatedCart = await Cart.findByIdAndUpdate(
      newCart[0]._id,
      { paymentId: newPayment[0]._id },
      { new: true, session }
    )
      .populate("userId")
      .populate("productId")
      .populate("paymentId");

    const userName = (updatedCart?.userId as any).name;
    const userEmail = (updatedCart?.userId as any).email;
    const userPhoneNumber = (updatedCart?.userId as any).phoneNumber;

    const sslCommerzPayload: ISSLCommerz = {
      amount: productTotalPrice,
      transactionId: transectionId,
      name: userName,
      email: userEmail,
      phoneNumber: userPhoneNumber,
    };

    const sslCommerz = await SSLService.sslPaymentInit(sslCommerzPayload);
    // console.log(sslCommerz);

    await session.commitTransaction();
    session.endSession();

    return {
      payment_url: sslCommerz.GatewayPageURL,
      Payment_Data: updatedCart,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const deleteCart = async (cartId: string, userId: string) => {
  const existCart = await Cart.findById(cartId);
  if (!existCart) {
    throw new AppError(401, "Cart is not Exists");
  }
  if (userId !== existCart?.userId?.toString()) {
    throw new AppError(401, "You Cant Delete this cart");
  }
  const session = await Cart.startSession();
  session.startTransaction();
  try {
    const existPayment = await Payment.findOne({ cartId: cartId });
    if (!existPayment) {
      throw new AppError(401, "Payment is not valid");
    }
    if (existPayment.status === PAYMENT_STATUS.PENDING) {
      await Payment.findOneAndDelete({ cartId: cartId }, { session });
      await Product.findByIdAndUpdate(
        existCart.productId,
        { $inc: { stock: existCart.quantity } },
        { new: true, session }
      );
      await Cart.findByIdAndDelete(cartId, { session });
    }
    await Product.findByIdAndUpdate(
      existCart.productId,
      { $inc: { stock: existCart.quantity } },
      { new: true, session }
    );
    await Cart.findByIdAndDelete(cartId, { session });
    await session.commitTransaction();
    await session.endSession();
    return "";
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const cartDataForUser = async (userId: string) => {
  const result = await Cart.find({ userId: userId })
    .populate("productId")
    .populate("paymentId");
  if (!result) {
    return null;
  } else {
    return result;
  }
};

export const cartDataForAdmin = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Cart.find(), query)
    .fields()
    .fields()
    .sort()
    .paginate();

  const result = await queryBuilder
    .builder()
    .populate("userId")
    .populate("productId")
    .populate("paymentId");
  return result;
};

export const cartServices = {
  createCart,
  deleteCart,
  cartDataForUser,
  cartDataForAdmin,
};
