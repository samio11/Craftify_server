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

const getAllCartForUser = catchAsync(async (req, res, next) => {
  const { userId } = req?.user as JwtPayload;
  const result = await cartServices.cartDataForUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Cart Getting Done",
    data: result,
  });
});
const getAllCartForAdmin = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await cartServices.cartDataForAdmin(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Cart Getting Done",
    data: result,
  });
});

export const cartController = {
  createCart,
  deleteCart,
  getAllCartForUser,
  getAllCartForAdmin,
};
