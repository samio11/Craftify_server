"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransictionId = void 0;
const generateTransictionId = () => {
    return `tran_${Date.now()}_${Math.random().toString(20).substring(2)}`;
};
exports.generateTransictionId = generateTransictionId;
