import { Router } from 'express';

import { UserPermission } from '../../models';

import { TagController } from '../controllers';
import { NicknameParser, Paginate, PermissionAuthorizer } from '../middlewares';
import { TagValidator } from '../validators';

export const tagRouter = Router();

tagRouter.get(
  '/tags',
  NicknameParser,
  Paginate,
  TagValidator.onGetTags,
  TagController.onGetTags
);

tagRouter.get(
  '/tags/:id',
  NicknameParser,
  Paginate,
  TagValidator.onGetTag,
  TagController.onGetTag
);

tagRouter.post(
  '/tags',
  PermissionAuthorizer(UserPermission.edit),
  TagValidator.onCreateTag,
  TagController.onCreateTag
);

tagRouter.delete(
  '/tags/:id',
  PermissionAuthorizer(UserPermission.edit),
  TagValidator.onDeleteTag,
  TagController.onDeleteTag
);

tagRouter.put(
  '/tags/:id',
  PermissionAuthorizer(UserPermission.edit),
  TagValidator.onUpdateTag,
  TagController.onUpdateTag
);
