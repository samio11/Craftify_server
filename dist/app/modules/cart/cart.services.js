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
exports.cartServices = exports.cartDataForAdmin = exports.cartDataForUser = void 0;
const AppError_1 = require("../../errors/AppError");
const generateTransictionId_1 = require("../../utils/generateTransictionId");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const payment_interface_1 = require("../payment/payment.interface");
const payment_model_1 = require("../payment/payment.model");
const products_model_1 = require("../product/products.model");
const sslCommer_service_1 = require("../sslCommerz/sslCommer.service");
const cart_model_1 = require("./cart.model");
const createCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existProduct = yield products_model_1.Product.findById(payload.productId);
    if (!existProduct) {
        throw new AppError_1.AppError(401, "Products is not exists");
    }
    const session = yield cart_model_1.Cart.startSession();
    session.startTransaction();
    try {
        const newCart = yield cart_model_1.Cart.create([payload], { session });
        const productTotalPrice = Number(payload.priceAtAdd) * Number(payload.quantity);
        console.log(productTotalPrice, Number(payload.priceAtAdd), Number(payload.quantity));
        const transectionId = (0, generateTransictionId_1.generateTransictionId)();
        // Decrease Product
        yield products_model_1.Product.findByIdAndUpdate(payload.productId, { $inc: { stock: -newCart[0].quantity } }, { new: true, session });
        const newPayment = yield payment_model_1.Payment.create([
            {
                cartId: (_a = newCart[0]) === null || _a === void 0 ? void 0 : _a._id,
                transection_id: transectionId,
                amount: productTotalPrice,
                status: payment_interface_1.PAYMENT_STATUS.PENDING,
            },
        ], { session });
        const updatedCart = yield cart_model_1.Cart.findByIdAndUpdate(newCart[0]._id, { paymentId: newPayment[0]._id }, { new: true, session })
            .populate("userId")
            .populate("productId")
            .populate("paymentId");
        const userName = (updatedCart === null || updatedCart === void 0 ? void 0 : updatedCart.userId).name;
        const userEmail = (updatedCart === null || updatedCart === void 0 ? void 0 : updatedCart.userId).email;
        const userPhoneNumber = (updatedCart === null || updatedCart === void 0 ? void 0 : updatedCart.userId).phoneNumber;
        const sslCommerzPayload = {
            amount: productTotalPrice,
            transactionId: transectionId,
            name: userName,
            email: userEmail,
            phoneNumber: userPhoneNumber,
        };
        const sslCommerz = yield sslCommer_service_1.SSLService.sslPaymentInit(sslCommerzPayload);
        // console.log(sslCommerz);
        yield session.commitTransaction();
        session.endSession();
        return {
            payment_url: sslCommerz.GatewayPageURL,
            Payment_Data: updatedCart,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const deleteCart = (cartId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const existCart = yield cart_model_1.Cart.findById(cartId);
    if (!existCart) {
        throw new AppError_1.AppError(401, "Cart is not Exists");
    }
    if (userId !== ((_b = existCart === null || existCart === void 0 ? void 0 : existCart.userId) === null || _b === void 0 ? void 0 : _b.toString())) {
        throw new AppError_1.AppError(401, "You Cant Delete this cart");
    }
    const session = yield cart_model_1.Cart.startSession();
    session.startTransaction();
    try {
        const existPayment = yield payment_model_1.Payment.findOne({ cartId: cartId });
        if (!existPayment) {
            throw new AppError_1.AppError(401, "Payment is not valid");
        }
        if (existPayment.status === payment_interface_1.PAYMENT_STATUS.PENDING) {
            yield payment_model_1.Payment.findOneAndDelete({ cartId: cartId }, { session });
            yield products_model_1.Product.findByIdAndUpdate(existCart.productId, { $inc: { stock: existCart.quantity } }, { new: true, session });
            yield cart_model_1.Cart.findByIdAndDelete(cartId, { session });
        }
        yield products_model_1.Product.findByIdAndUpdate(existCart.productId, { $inc: { stock: existCart.quantity } }, { new: true, session });
        yield cart_model_1.Cart.findByIdAndDelete(cartId, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return "";
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const cartDataForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ userId: userId })
        .populate("productId")
        .populate("paymentId");
    if (!result) {
        return null;
    }
    else {
        return result;
    }
});
exports.cartDataForUser = cartDataForUser;
const cartDataForAdmin = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(cart_model_1.Cart.find(), query)
        .fields()
        .fields()
        .sort()
        .paginate();
    const result = yield queryBuilder
        .builder()
        .populate("userId")
        .populate("productId")
        .populate("paymentId");
    return result;
});
exports.cartDataForAdmin = cartDataForAdmin;
exports.cartServices = {
    createCart,
    deleteCart,
    cartDataForUser: exports.cartDataForUser,
    cartDataForAdmin: exports.cartDataForAdmin,
};
