import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { productServices } from "./product.service";

const createProduct = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req?.body?.data),
    images: (req?.files as Express.Multer.File[]).map((x) => x.path),
  };

  const result = await productServices.createProduct(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Product Created Done",
    data: result,
  });
});
const getAllProduct = catchAsync(async (req, res, next) => {
  const query = req?.query;

  const result = await productServices.getAllProducts(
    query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product Getting Done",
    data: result,
  });
});

export const productController = { createProduct, getAllProduct };
