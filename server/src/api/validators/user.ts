import { celebrate, Joi } from 'celebrate';

export const UserValidator = {
  onGetUsers: celebrate({
    query: {
      limit: Joi.string().default('20'),
      page: Joi.string().default('1'),
      offset: Joi.string(),
    },
  }),
  onGetUser: celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  onDeleteUser: celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  onUpdateUser: celebrate({
    params: {
      id: Joi.string().required(),
    },
    body: {},
  }),
  onGetUserRequests: celebrate({
    query: {
      limit: Joi.string().default('20'),
      page: Joi.string().default('1'),
      offset: Joi.string(),
    },
  }),
  onGetUserRequest: celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  onCreateUserRequest: celebrate({
    body: {
      permission: Joi.string().required().valid('edit', 'admin'),
    },
  }),
  onDeleteUserRequest: celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  onUpdateUserRequest: celebrate({
    params: {
      id: Joi.string().required(),
    },
    body: {
      permission: Joi.string().required().valid('edit', 'admin'),
    },
  }),
};
