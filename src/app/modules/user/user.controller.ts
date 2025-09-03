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

export const userController = { createUser };
