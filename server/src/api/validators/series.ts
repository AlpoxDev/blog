import { celebrate, Joi } from 'celebrate';

export const SeriesValidator = {
  onGetSeriesList: celebrate({
    query: {
      nickname: Joi.string().required(),
      limit: Joi.string().default('20'),
      page: Joi.string().default('1'),
      offset: Joi.string(),
    },
  }),
  onGetSeries: celebrate({
    params: {
      id: Joi.string().required(),
    },
    query: {
      nickname: Joi.string().required(),
    },
  }),
  onCreateSeries: celebrate({
    body: {
      title: Joi.string().required(),
      content: Joi.string(),
      posts: Joi.array().items(Joi.string()),
    },
  }),
  onDeleteSeries: celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  onUpdateSeries: celebrate({
    params: {
      id: Joi.string().required(),
    },
    body: {
      title: Joi.string().required(),
      content: Joi.string(),
      posts: Joi.array().items(Joi.string()),
    },
  }),
};
