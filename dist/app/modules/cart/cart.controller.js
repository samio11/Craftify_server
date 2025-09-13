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
exports.cartController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const cart_services_1 = require("./cart.services");
const createCart = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req === null || req === void 0 ? void 0 : req.user;
    const payload = Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { userId: userId });
    const result = yield cart_services_1.cartServices.createCart(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Cart Created Done",
        success: true,
        data: result,
    });
}));
const deleteCart = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req === null || req === void 0 ? void 0 : req.user;
    const { cartId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield cart_services_1.cartServices.deleteCart(cartId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Cart Deleted Done",
        success: true,
        data: result,
    });
}));
const getAllCartForUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield cart_services_1.cartServices.cartDataForUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Cart Getting Done",
        data: result,
    });
}));
const getAllCartForAdmin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield cart_services_1.cartServices.cartDataForAdmin(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Cart Getting Done",
        data: result,
    });
}));
exports.cartController = {
    createCart,
    deleteCart,
    getAllCartForUser,
    getAllCartForAdmin,
};
