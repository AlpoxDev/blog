"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesValidator = void 0;
const celebrate_1 = require("celebrate");
exports.SeriesValidator = {
    onGetSeriesList: celebrate_1.celebrate({
        query: {
            nickname: celebrate_1.Joi.string().required(),
            limit: celebrate_1.Joi.string().default('20'),
            page: celebrate_1.Joi.string().default('1'),
            offset: celebrate_1.Joi.string(),
        },
    }),
    onGetSeries: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
        query: {
            nickname: celebrate_1.Joi.string().required(),
        },
    }),
    onCreateSeries: celebrate_1.celebrate({
        body: {
            title: celebrate_1.Joi.string().required(),
            content: celebrate_1.Joi.string(),
            posts: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
        },
    }),
    onDeleteSeries: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
    }),
    onUpdateSeries: celebrate_1.celebrate({
        params: {
            id: celebrate_1.Joi.string().required(),
        },
        body: {
            title: celebrate_1.Joi.string().required(),
            content: celebrate_1.Joi.string(),
            posts: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
        },
    }),
};
