"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const user_controller_1 = require("./user.controller");
const routes = (0, express_1.Router)();
routes.post("/create-user", multer_config_1.multerUpload.single("file"), user_controller_1.userController.createUser);
exports.userRoutes = routes;
