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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_model_1 = require("../modules/user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email) {
            return done(null, false, { message: "Email is not found" });
        }
        const existUser = yield user_model_1.User.findOne({ email });
        if (!existUser) {
            return done(null, false, { message: "User is not exists" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, existUser.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            return done(null, false, { message: "Password is not matched" });
        }
        return done(null, existUser);
    }
    catch (err) {
        return done(err);
    }
})));
