import { celebrate, Joi } from 'celebrate';

export const TagValidator = {
  onGetTags: celebrate({
    query: {
      nickname: Joi.string().required(),
      limit: Joi.string().default('20'),
      page: Joi.string().default('1'),
      offset: Joi.string(),
    },
  }),
  onGetTag: celebrate({
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
  onCreateTag: celebrate({
    body: {
      name: Joi.string(),
    },
  }),
  onDeleteTag: celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  onUpdateTag: celebrate({
    params: {
      id: Joi.string().required(),
    },
    body: {
      name: Joi.string().required(),
    },
  }),
};
