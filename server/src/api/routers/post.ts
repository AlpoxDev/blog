import { Router } from 'express';

import { UserPermission } from '../../models';

import { PostController } from '../controllers';
import { NicknameParser, Paginate, PermissionAuthorizer } from '../middlewares';
import { PostValidator } from '../validators';

export const postRouter = Router();

postRouter.get(
  '/posts',
  NicknameParser,
  Paginate,
  PostValidator.onGetPosts,
  PostController.onGetPosts
);

postRouter.get(
  '/posts/:id',
  NicknameParser,
  PostValidator.onGetPost,
  PostController.onGetPost
);

postRouter.post(
  '/posts',
  PermissionAuthorizer(UserPermission.edit),
  PostValidator.onCreatePost,
  PostController.onCreatePost
);

postRouter.delete(
  '/posts/:id',
  PermissionAuthorizer(UserPermission.edit),
  PostValidator.onDeletePost,
  PostController.onDeletePost
);

postRouter.put(
  '/posts/:id',
  PermissionAuthorizer(UserPermission.edit),
  PostValidator.onUpdatePost,
  PostController.onUpdatePost
);
