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
  onCreateAndUpdateCategorys: celebrate({
    body: {
      categorys: Joi.array().items(
        Joi.object({
          id: Joi.string(),
          name: Joi.string(),
          subCategorys: Joi.array().items(
            Joi.object({
              id: Joi.string(),
              name: Joi.string(),
            })
          ),
        })
      ),
    },
  }),
};
