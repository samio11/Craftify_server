"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductAttribute = new mongoose_1.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
});
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true },
    attributes: { type: [ProductAttribute] },
    ratingAvg: { type: Number, required: true },
    reviewsCount: { type: Number, required: true },
}, { timestamps: true, versionKey: false });
exports.Product = (0, mongoose_1.model)("Product", productSchema);
