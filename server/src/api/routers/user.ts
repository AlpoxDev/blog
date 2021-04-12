import { Router } from 'express';

import { UserPermission } from '../../models';

import { UserController } from '../controllers';
import { Paginate, Authorizer, PermissionAuthorizer } from '../middlewares';
import { UserValidator } from '../validators';

export const userRouter = Router();

userRouter.get(
  '/users',
  PermissionAuthorizer(UserPermission.admin),
  Paginate,
  UserValidator.onGetUsers,
  UserController.onGetUsers
);

userRouter.get(
  '/users/:id',
  Authorizer,
  UserValidator.onGetUser,
  UserController.onGetUser
);

userRouter.delete(
  '/users/:id',
  Authorizer,
  UserValidator.onDeleteUser,
  UserController.onDeleteUser
);

userRouter.patch(
  '/users/:id',
  Authorizer,
  UserValidator.onUpdateUser,
  UserController.onUpdateUser
);

userRouter.get(
  '/user_permission_requests',
  PermissionAuthorizer(UserPermission.admin),
  UserValidator.onGetUserRequests,
  UserController.onGetUserRequests
);

userRouter.get(
  '/user_permission_requests/:id',
  Authorizer,
  UserValidator.onGetUserRequest,
  UserController.onGetUserRequest
);

userRouter.post(
  '/user_permission_requests',
  Authorizer,
  UserValidator.onCreateUserRequest,
  UserController.onCreateUserRequest
);

userRouter.delete(
  '/user_permission_requests/:id',
  Authorizer,
  UserValidator.onDeleteUserRequest,
  UserController.onDeleteUserRequest
);

userRouter.put(
  '/user_permission_requests/:id',
  Authorizer,
  UserValidator.onUpdateUserRequest,
  UserController.onUpdateUserRequest
);
