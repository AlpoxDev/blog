import { Router } from 'express';

import { CategoryController } from '../controllers';
import { NicknameParser, PermissionAuthorizer, Paginate } from '../middlewares';
import { CategoryValidator } from '../validators';
import { UserPermission } from '../../models';

export const categoryRouter = Router();

categoryRouter.get(
  '/categorys',
  NicknameParser,
  CategoryValidator.onGetCategorys,
  Paginate,
  CategoryController.onGetCategorys
);

categoryRouter.get(
  '/categorys/:id',
  NicknameParser,
  CategoryValidator.onGetCategory,
  Paginate,
  CategoryController.onGetCategory
);

categoryRouter.post(
  '/categorys',
  PermissionAuthorizer(UserPermission.edit),
  CategoryValidator.onCreateAndUpdateCategorys,
  CategoryController.onCreateAndUpdateCategorys
);
