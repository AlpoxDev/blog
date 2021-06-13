import { celebrate, Joi } from 'celebrate';

export const AuthValidator = {
  onLogin: celebrate({
    body: {
      id: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  onRegister: celebrate({
    body: {
      email: Joi.string().required(),
      nickname: Joi.string().required(),
      password: Joi.string().required(),
      isMarketing: Joi.boolean().default(true),
    },
  }),
  onCheckDuplicate: celebrate({
    query: {
      nickname: Joi.string().required(),
      key: Joi.string().required().valid('email', 'nickname'),
      value: Joi.string().required(),
    },
  }),
  onGithub: celebrate({
    body: {
      code: Joi.string().required(),
    },
  }),
};
