"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidator = void 0;
const celebrate_1 = require("celebrate");
exports.PostValidator = {
    onGetPosts: celebrate_1.celebrate({
        query: {
            nickname: celebrate_1.Joi.string().required(),
            limit: celebrate_1.Joi.string().default('20'),
            page: celebrate_1.Joi.string().default('1'),
            offset: celebrate_1.Joi.string(),
        },
    }),
    onGetPost: celebrate_1.celebrate({
        query: {
            nickname: celebrate_1.Joi.string().required(),
        },
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onCreatePost: celebrate_1.celebrate({
        body: {
            title: celebrate_1.Joi.string().required(),
            subtitle: celebrate_1.Joi.string(),
            content: celebrate_1.Joi.string().required(),
            category: celebrate_1.Joi.string().required(),
            series: celebrate_1.Joi.string(),
            tags: celebrate_1.Joi.array().items(celebrate_1.Joi.string()).default([]),
        },
    }),
    onDeletePost: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onUpdatePost: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
        body: {
            title: celebrate_1.Joi.string().required(),
            subtitle: celebrate_1.Joi.string(),
            content: celebrate_1.Joi.string().required(),
            category: celebrate_1.Joi.string().required(),
            series: celebrate_1.Joi.string(),
            tags: celebrate_1.Joi.array().items(celebrate_1.Joi.string()).default([]),
        },
    }),
};
