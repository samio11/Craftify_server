import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req.body.data),
    userImage: req.file?.path,
  };
  const result = await userServices.createUser(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User Created Done",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req.body.data),
    userImage: req.file?.path,
  };
  const { userId } = req.user as JwtPayload;

  const result = await userServices.updateUser(userId, payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Updated Done",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res, next) => {
  const query = req?.query;

  const result = await userServices.getALlUSer(query as Record<string, string>);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User info getting Done",
    data: result,
  });
});
const getUser = catchAsync(async (req, res, next) => {
  const { userId } = req?.user as JwtPayload;

  const result = await userServices.getUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User info getting Done",
    data: result,
  });
});

export const userController = { createUser, updateUser, getAllUser, getUser };
