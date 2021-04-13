"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const celebrate_1 = require("celebrate");
exports.UserValidator = {
    onGetUsers: celebrate_1.celebrate({
        query: {
            limit: celebrate_1.Joi.string().default('20'),
            page: celebrate_1.Joi.string().default('1'),
            offset: celebrate_1.Joi.string(),
        },
    }),
    onGetUser: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onDeleteUser: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onUpdateUser: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
        body: {
            profile: celebrate_1.Joi.string(),
            nickname: celebrate_1.Joi.string(),
        },
    }),
    onGetUserRequests: celebrate_1.celebrate({
        query: {
            limit: celebrate_1.Joi.string().default('20'),
            page: celebrate_1.Joi.string().default('1'),
            offset: celebrate_1.Joi.string(),
        },
    }),
    onGetUserRequest: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onCreateUserRequest: celebrate_1.celebrate({
        body: {
            permission: celebrate_1.Joi.string().required().valid('edit', 'admin'),
        },
    }),
    onDeleteUserRequest: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onUpdateUserRequest: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
        body: {
            permission: celebrate_1.Joi.string().required().valid('edit', 'admin'),
        },
    }),
};
