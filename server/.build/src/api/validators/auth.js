"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const celebrate_1 = require("celebrate");
exports.AuthValidator = {
    onLogin: celebrate_1.celebrate({
        body: {
            id: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
        },
    }),
    onRegister: celebrate_1.celebrate({
        body: {
            email: celebrate_1.Joi.string().required(),
            nickname: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
            isMarketing: celebrate_1.Joi.boolean().default(true),
        },
    }),
};
