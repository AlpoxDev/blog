"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagValidator = void 0;
const celebrate_1 = require("celebrate");
exports.TagValidator = {
    onGetTags: celebrate_1.celebrate({
        query: {
            nickname: celebrate_1.Joi.string().required(),
            limit: celebrate_1.Joi.string().default('20'),
            page: celebrate_1.Joi.string().default('1'),
            offset: celebrate_1.Joi.string(),
        },
    }),
    onGetTag: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
        query: {
            nickname: celebrate_1.Joi.string().required(),
            limit: celebrate_1.Joi.string().default('20'),
            page: celebrate_1.Joi.string().default('1'),
            offset: celebrate_1.Joi.string(),
        },
    }),
    onCreateTag: celebrate_1.celebrate({
        body: {
            name: celebrate_1.Joi.string(),
        },
    }),
    onDeleteTag: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onUpdateTag: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
        body: {
            name: celebrate_1.Joi.string().required(),
        },
    }),
};
