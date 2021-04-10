import { celebrate, Joi } from 'celebrate';

export const CategoryValidator = {
  onGetCategorys: celebrate({
    query: {
      nickname: Joi.string().required(),
      limit: Joi.string().default('20'),
      page: Joi.string().default('1'),
      offset: Joi.string(),
    },
  }),
  onGetCategory: celebrate({
    params: {
      id: Joi.string().required(),
    },
    query: {
      nickname: Joi.string().required(),
      limit: Joi.string().default('20'),
      page: Joi.string().default('1'),
      offset: Joi.string(),
    },
  }),
  onCreateCategory: celebrate({
    body: {
      type: Joi.string().valid('main', 'sub'),
      name: Joi.string().required(),
      mainCategoryId: Joi.string(),
      sequence: Joi.number().default(0),
    },
  }),
  onDeleteCategory: celebrate({
    params: {
      id: Joi.string().required(),
    },
    body: {
      type: Joi.string().valid('main', 'sub'),
    },
  }),
  // onUpdateCategory: celebrate({}),
};
