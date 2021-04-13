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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NicknameParser = void 0;
const models_1 = require("../../models");
const NicknameParser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname } = req.query;
    try {
        if (!nickname)
            throw { status: 400, message: 'BadRequest: NotFound nickname' };
        const user = yield models_1.User.findOne({ where: { nickname } });
        if (!user)
            throw { status: 404, message: 'NotFound user in NicknameParser' };
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.NicknameParser = NicknameParser;
