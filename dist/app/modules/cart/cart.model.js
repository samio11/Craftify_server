"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cart_interface_1 = require("./cart.interface");
const cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    paymentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Payment" },
    priceAtAdd: { type: Number, min: 1 },
    quantity: { type: Number, required: true },
    status: {
        type: String,
        enum: {
            values: Object.values(cart_interface_1.CART_STATUS),
            message: "{VALUE} is not a valid cart status",
        },
        default: cart_interface_1.CART_STATUS.PENDING,
    },
}, { timestamps: true, versionKey: false });
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
