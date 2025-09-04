import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewServices } from "./review.services";

const createReview = catchAsync(async (req, res, next) => {
  const payload = req?.body;
  const result = await reviewServices.createReview(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review Create Done",
    data: result,
  });
});
const getAllReview = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await reviewServices.getAllReview(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review Getting Done",
    data: result,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const id = req?.params?.id;
  const payload = req?.body;
  const { userId } = req?.user as JwtPayload;
  const result = await reviewServices.updateReview(id, payload, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review Updated Done",
    data: result,
  });
});
const deleteReview = catchAsync(async (req, res, next) => {
  const id = req?.params?.id;
  const { userId } = req?.user as JwtPayload;
  const result = await reviewServices.deleteReview(id, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review Deleted Done",
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getAllReview,
  updateReview,
  deleteReview,
};
