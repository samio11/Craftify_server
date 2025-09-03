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
exports.redisConnection = void 0;
const redis_1 = require("redis");
const _1 = __importDefault(require("."));
const redisClient = (0, redis_1.createClient)({
    username: _1.default.RedisUserName,
    password: _1.default.RedisPassword,
    socket: {
        host: _1.default.RedisHost,
        port: Number(_1.default.RedisPort),
    },
});
// await client.connect();
// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar
const redisConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!redisClient.isOpen) {
        yield redisClient.connect();
        console.log("Redis is Connected");
    }
});
exports.redisConnection = redisConnection;
