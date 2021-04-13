"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidator = void 0;
const celebrate_1 = require("celebrate");
exports.CategoryValidator = {
    onGetCategorys: celebrate_1.celebrate({
        query: {
            nickname: celebrate_1.Joi.string().required(),
            limit: celebrate_1.Joi.string().default('20'),
            page: celebrate_1.Joi.string().default('1'),
            offset: celebrate_1.Joi.string(),
        },
    }),
    onGetCategory: celebrate_1.celebrate({
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
    onCreateAndUpdateCategorys: celebrate_1.celebrate({
        body: {
            categorys: celebrate_1.Joi.array().items(celebrate_1.Joi.object({
                id: celebrate_1.Joi.string(),
                name: celebrate_1.Joi.string(),
                subCategorys: celebrate_1.Joi.array().items(celebrate_1.Joi.object({
                    id: celebrate_1.Joi.string(),
                    name: celebrate_1.Joi.string(),
                })),
            })),
        },
    }),
};
