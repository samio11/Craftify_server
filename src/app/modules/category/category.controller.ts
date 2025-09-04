import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { categoryServices } from "./category.services";

const createCategory = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req?.body?.data),
    imageUrl: req?.file?.path,
  };

  const result = await categoryServices.createCategory(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Category Created Done",
    data: result,
  });
});
const updateCategory = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req?.body?.data),
    imageUrl: req?.file?.path,
  };
  const id = req.params.id;
  const result = await categoryServices.updateACategory(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Category Updated Done",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await categoryServices.getAllCategory(
    query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category Data Getted Done",
    data: result,
  });
});
const deleteACategory = catchAsync(async (req, res, next) => {
  const id = req?.params?.id;
  const result = await categoryServices.deleteCategory(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category Data Deleted Done",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteACategory,
};
