"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const category_routes_1 = require("../modules/category/category.routes");
const product_routes_1 = require("../modules/product/product.routes");
const review_routes_1 = require("../modules/review/review.routes");
exports.rootRouter = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/category",
        element: category_routes_1.categoryRoutes,
    },
    {
        path: "/product",
        element: product_routes_1.productRoutes,
    },
    {
        path: "/review",
        element: review_routes_1.reviewRoutes,
    },
];
moduleRoutes.forEach((x) => exports.rootRouter.use(x.path, x.element));
