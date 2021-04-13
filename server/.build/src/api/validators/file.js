"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidator = void 0;
const celebrate_1 = require("celebrate");
exports.FileValidator = {
    onUploadImages: celebrate_1.celebrate({
        query: {
            option: celebrate_1.Joi.string().default('image'),
        },
    }),
    onGetFiles: celebrate_1.celebrate({
        query: {
            folder: celebrate_1.Joi.string(),
        },
    }),
};
