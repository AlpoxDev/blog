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
exports.AuthController = void 0;
const typedi_1 = require("typedi");
const services_1 = require("../../services");
class AuthController {
    static onLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authService = typedi_1.Container.get(services_1.AuthService);
                const response = yield authService.onLogin(req.body);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authService = typedi_1.Container.get(services_1.AuthService);
                const response = yield authService.onRegister(req.body);
                res.status(201).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
