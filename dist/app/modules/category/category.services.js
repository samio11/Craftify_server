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
exports.categoryServices = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const category_model_1 = require("./category.model");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(payload);
    return result;
});
const getAllCategory = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(category_model_1.Category.find(), query)
        .filter()
        .search(["name"])
        .sort()
        .fields()
        .paginate();
    const result = yield queryBuilder.builder();
    return result;
});
const updateACategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const duplicateCategory = yield category_model_1.Category.findOne({
        name: payload.name,
        _id: { $ne: id },
    });
    if (duplicateCategory) {
        throw new AppError_1.AppError(401, "Category is already exists");
    }
    const result = yield category_model_1.Category.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndDelete(id);
    return result;
});
exports.categoryServices = {
    createCategory,
    getAllCategory,
    updateACategory,
    deleteCategory,
};
