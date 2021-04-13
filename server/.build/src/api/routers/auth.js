"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
exports.authRouter = express_1.Router();
exports.authRouter.post('/auth/login', validators_1.AuthValidator.onLogin, controllers_1.AuthController.onLogin);
exports.authRouter.post('/auth/register', validators_1.AuthValidator.onRegister, controllers_1.AuthController.onRegister);
