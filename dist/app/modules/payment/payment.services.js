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
exports.paymentServices = void 0;
const AppError_1 = require("../../errors/AppError");
const cart_interface_1 = require("../cart/cart.interface");
const cart_model_1 = require("../cart/cart.model");
const products_model_1 = require("../product/products.model");
const sslCommer_service_1 = require("../sslCommerz/sslCommer.service");
const payment_interface_1 = require("./payment.interface");
const payment_model_1 = require("./payment.model");
const initPayment = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const existPayment = yield payment_model_1.Payment.findOne({ cartId });
    if (!existPayment) {
        throw new AppError_1.AppError(401, "Order is not found");
    }
    const existCart = yield cart_model_1.Cart.findById(cartId).populate("userId");
    const userName = (existCart === null || existCart === void 0 ? void 0 : existCart.userId).name;
    const userEmail = (existCart === null || existCart === void 0 ? void 0 : existCart.userId).email;
    const userPhoneNumber = (existCart === null || existCart === void 0 ? void 0 : existCart.userId).phoneNumber;
    const sslCommerzPayload = {
        amount: existPayment === null || existPayment === void 0 ? void 0 : existPayment.amount,
        transactionId: existPayment === null || existPayment === void 0 ? void 0 : existPayment.transection_id,
        name: userName,
        email: userEmail,
        phoneNumber: userPhoneNumber,
    };
    //   console.log(sslCommerzPayload);
    const sslCommerz = yield sslCommer_service_1.SSLService.sslPaymentInit(sslCommerzPayload);
    return {
        payment_url: sslCommerz === null || sslCommerz === void 0 ? void 0 : sslCommerz.GatewayPageURL,
    };
});
const successPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield payment_model_1.Payment.startSession();
    session.startTransaction();
    try {
        const updatepayment = yield payment_model_1.Payment.findOneAndUpdate({ transection_id: query === null || query === void 0 ? void 0 : query.transactionId }, { status: payment_interface_1.PAYMENT_STATUS.COMPLETE }, { new: true, session });
        const updateCart = yield cart_model_1.Cart.findOneAndUpdate({ _id: updatepayment === null || updatepayment === void 0 ? void 0 : updatepayment.cartId }, { status: cart_interface_1.CART_STATUS.COMPLETE }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Payment Created Done",
            success: true,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const failPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield payment_model_1.Payment.startSession();
    session.startTransaction();
    try {
        const updatepayment = yield payment_model_1.Payment.findOneAndUpdate({ transection_id: query === null || query === void 0 ? void 0 : query.transactionId }, { status: payment_interface_1.PAYMENT_STATUS.FAILED }, { new: true, session });
        const updateCart = yield cart_model_1.Cart.findOneAndUpdate({ _id: updatepayment === null || updatepayment === void 0 ? void 0 : updatepayment.cartId }, { status: cart_interface_1.CART_STATUS.FAILED }, { new: true, session });
        yield products_model_1.Product.findByIdAndUpdate(updateCart === null || updateCart === void 0 ? void 0 : updateCart.productId, { $inc: { stock: updateCart === null || updateCart === void 0 ? void 0 : updateCart.quantity } }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Payment Failed",
            success: true,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const cancelPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield payment_model_1.Payment.startSession();
    session.startTransaction();
    try {
        const updatepayment = yield payment_model_1.Payment.findOneAndUpdate({ transection_id: query === null || query === void 0 ? void 0 : query.transactionId }, { status: payment_interface_1.PAYMENT_STATUS.CANCEL }, { new: true, session });
        const updateCart = yield cart_model_1.Cart.findOneAndUpdate({ _id: updatepayment === null || updatepayment === void 0 ? void 0 : updatepayment.cartId }, { status: cart_interface_1.CART_STATUS.CANCEL }, { new: true, session });
        yield products_model_1.Product.findByIdAndUpdate(updateCart === null || updateCart === void 0 ? void 0 : updateCart.productId, { $inc: { stock: updateCart === null || updateCart === void 0 ? void 0 : updateCart.quantity } }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Payment Canceled",
            success: true,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
exports.paymentServices = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
};
