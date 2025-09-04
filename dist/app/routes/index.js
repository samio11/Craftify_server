"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const category_routes_1 = require("../modules/category/category.routes");
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
];
moduleRoutes.forEach((x) => exports.rootRouter.use(x.path, x.element));
