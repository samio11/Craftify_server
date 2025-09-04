"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const routes = (0, express_1.Router)();
routes.post("/login", auth_controller_1.authController.credentialLogin);
routes.post("/logout", auth_controller_1.authController.logout);
exports.authRoutes = routes;
