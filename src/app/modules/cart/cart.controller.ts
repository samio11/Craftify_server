import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cartServices } from "./cart.services";

const createCart = catchAsync(async (req, res, next) => {
  const { userId } = req?.user as JwtPayload;
  const payload = {
    ...req?.body,
    userId: userId,
  };
  const result = await cartServices.createCart(payload);
  sendResponse(res, {
    statusCode: 201,
    message: "Cart Created Done",
    success: true,
    data: result,
  });
});
const deleteCart = catchAsync(async (req, res, next) => {
  const { userId } = req?.user as JwtPayload;
  const { cartId } = req?.params;
  const result = await cartServices.deleteCart(cartId, userId);
  sendResponse(res, {
    statusCode: 201,
    message: "Cart Deleted Done",
    success: true,
    data: result,
  });
});

export const cartController = { createCart, deleteCart };
