"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signToken = (payload, expiresIn = '1d') => {
    try {
        return jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, { expiresIn });
    }
    catch (error) {
        throw { status: 401, message: '토큰 생성 오류!' };
    }
};
exports.signToken = signToken;
const verifyToken = (token) => {
    if (!token)
        return null;
    try {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    }
    catch (error) {
        throw { status: 400, message: '토큰 인증 오류!' };
    }
};
exports.verifyToken = verifyToken;
