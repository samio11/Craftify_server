import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentServices } from "./payment.services";

const initPayment = catchAsync(async (req, res, next) => {
  const id = req?.params?.id;
  const result = await paymentServices.initPayment(id);
  sendResponse(res, {
    statusCode: 200,
    message: "Payment Url Given",
    success: true,
    data: result,
  });
});

const successfulPayment = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await paymentServices.successPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${config.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const failPayment = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await paymentServices.failPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${config.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const canceledPayment = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await paymentServices.cancelPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${config.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

const getAllPaymentData = catchAsync(async (req, res, next) => {
  const result = await paymentServices.getAllPaymentData();
  sendResponse(res, {
    statusCode: 200,
    message: "Payment Data Getted",
    success: true,
    data: result,
  });
});

export const paymentController = {
  initPayment,
  successfulPayment,
  failPayment,
  canceledPayment,
  getAllPaymentData,
};
