"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Product" },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true, min: 3 },
    comment: { type: String, required: true, min: [3, "Must be more than 3"] },
}, { timestamps: true, versionKey: false });
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
