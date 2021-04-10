import { celebrate, Joi } from 'celebrate';

export const FileValidator = {
  onUploadImages: celebrate({
    query: {
      option: Joi.string().default('image'),
    },
    // body: {
    //   files: Joi.any().required(),
    // },
  }),
  onGetFiles: celebrate({
    query: {
      folder: Joi.string(),
    },
  }),
};
