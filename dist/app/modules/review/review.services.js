"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewServices = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const products_model_1 = require("../product/products.model");
const review_model_1 = require("./review.model");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield products_model_1.Product.findById(payload.productId);
    if (!existProduct) {
        throw new AppError_1.AppError(401, "Product is not exists");
    }
    const result = yield review_model_1.Review.create(payload);
    return result;
});
const getAllReview = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(review_model_1.Review.find(), query)
        .filter()
        .search(["title"])
        .sort()
        .fields()
        .paginate();
    const result = yield queryBuilder.builder().populate("productId");
    return result;
});
const updateReview = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existReview = yield review_model_1.Review.findById(id);
    if (!existReview) {
        throw new AppError_1.AppError(401, "Review not found");
    }
    if (userId !== existReview.userId.toString()) {
        throw new AppError_1.AppError(401, "You Cant Update This Review");
    }
    const result = yield review_model_1.Review.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteReview = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existReview = yield review_model_1.Review.findById(id);
    if (!existReview) {
        throw new AppError_1.AppError(401, "Review not found");
    }
    if (userId !== existReview.userId.toString()) {
        throw new AppError_1.AppError(401, "You Cant Update This Review");
    }
    const result = yield review_model_1.Review.findByIdAndDelete(id);
    return result;
});
exports.reviewServices = {
    createReview,
    getAllReview,
    updateReview,
    deleteReview,
};
