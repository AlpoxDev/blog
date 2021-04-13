"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AuthService = void 0;
const sequelize_1 = require("sequelize");
const typedi_1 = require("typedi");
const models_1 = require("../models");
const common_1 = require("../common");
let AuthService = class AuthService {
    onLogin({ id, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({
                    where: {
                        [sequelize_1.Op.or]: [{ email: id }, { nickname: id }],
                        method: models_1.UserMethod.default,
                    },
                    attributes: ['id', 'email', 'nickname', 'password', 'permission'],
                });
                if (!user)
                    throw { status: 404, message: 'NotFound user' };
                const isPassword = yield common_1.comparePassword(password, user.password);
                if (!isPassword)
                    throw { status: 400, message: 'BadRequest: Password Incorrect' };
                const accessToken = user.accessToken;
                const refreshToken = user.getRefreshToken(accessToken);
                return {
                    accessToken,
                    refreshToken,
                    id: user.id,
                    permission: user.permission,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onRegister({ email, password, nickname, isMarketing, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUser = yield models_1.User.findOne({
                    where: {
                        [sequelize_1.Op.or]: [{ email }, { nickname }],
                        method: models_1.UserMethod.default,
                    },
                    attributes: [
                        'id',
                        'email',
                        'nickname',
                        'password',
                        'permission',
                        'method',
                        'isMarketing',
                    ],
                });
                if (findUser)
                    throw {
                        status: 400,
                        message: 'BadRequest: Duplicated email or nickname',
                    };
                const hashPassword = yield common_1.createPassword(password);
                const user = yield models_1.User.create({
                    email,
                    password: hashPassword,
                    nickname,
                    isMarketing,
                });
                const accessToken = user.accessToken;
                const refreshToken = user.getRefreshToken(accessToken);
                return {
                    accessToken,
                    refreshToken,
                    id: user.id,
                    permission: user.permission,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
AuthService = __decorate([
    typedi_1.Service()
], AuthService);
exports.AuthService = AuthService;
