"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    cartId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Cart", required: true },
    transection_id: { type: String, required: true },
    amount: { type: Number },
    status: { type: String },
});
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
