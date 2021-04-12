import { celebrate, Joi } from 'celebrate';

export const PostValidator = {
  onGetPosts: celebrate({
    query: {
      nickname: Joi.string().required(),
      limit: Joi.string().default('20'),
      page: Joi.string().default('1'),
      offset: Joi.string(),
    },
  }),
  onGetPost: celebrate({
    query: {
      nickname: Joi.string().required(),
    },
    params: {
      id: Joi.string().required(),
    },
  }),
  onCreatePost: celebrate({
    body: {},
  }),
  onDeletePost: celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  onUpdatePost: celebrate({
    params: {
      id: Joi.string().required(),
    },
    body: {},
  }),
};
