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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const passport_1 = __importDefault(require("passport"));
const catchAsync_1 = require("../../utils/catchAsync");
const AppError_1 = require("../../errors/AppError");
const userToken_1 = require("../../utils/userToken");
const setCookies_1 = require("../../utils/setCookies");
const sendResponse_1 = require("../../utils/sendResponse");
const credentialLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(new AppError_1.AppError(401, err));
        }
        if (!user) {
            return next(new AppError_1.AppError(401, info.message));
        }
        const token = (0, userToken_1.createUserToken)(user);
        (0, setCookies_1.setCookie)(res, token);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "User Login Done",
            statusCode: 200,
            data: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            },
        });
    }))(req, res, next);
}));
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User Logout Done",
        statusCode: 200,
        data: "",
    });
}));
exports.authController = { credentialLogin, logout };
