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
exports.productServices = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const category_model_1 = require("../category/category.model");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const products_model_1 = require("./products.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existCategory = yield category_model_1.Category.findById(payload.categoryId);
    if (!existCategory) {
        throw new AppError_1.AppError(401, "This Category is not Exists");
    }
    const existUser = yield user_model_1.User.findById(payload.sellerId);
    if (!existUser) {
        throw new AppError_1.AppError(401, "User is not Exists");
    }
    if ((existUser === null || existUser === void 0 ? void 0 : existUser.role) !== user_interface_1.IRole.seller) {
        throw new AppError_1.AppError(401, "This Seller is not Exists");
    }
    const result = yield products_model_1.Product.create(payload);
    return result;
});
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(products_model_1.Product.find(), query)
        .filter()
        .search(["title"])
        .sort()
        .fields()
        .paginate();
    const result = yield queryBuilder.builder();
    return result;
});
exports.productServices = { createProduct, getAllProducts };
