import { Router } from 'express';
import { UserPermission } from '../../models';
import { SeriesController } from '../controllers';
import { NicknameParser, Paginate, PermissionAuthorizer } from '../middlewares';
import { SeriesValidator } from '../validators';

export const seriesRouter = Router();

seriesRouter.get(
  '/series',
  NicknameParser,
  Paginate,
  SeriesValidator.onGetSeriesList,
  SeriesController.onGetSeriesList
);

seriesRouter.get(
  '/series/:id',
  NicknameParser,
  SeriesValidator.onGetSeries,
  SeriesController.onGetSeries
);

seriesRouter.post(
  '/series',
  PermissionAuthorizer(UserPermission.edit),
  SeriesValidator.onCreateSeries,
  SeriesController.onCreateSeries
);

seriesRouter.delete(
  '/series/:id',
  PermissionAuthorizer(UserPermission.edit),
  SeriesValidator.onDeleteSeries,
  SeriesController.onDeleteSeries
);

seriesRouter.put(
  '/series/:id',
  PermissionAuthorizer(UserPermission.edit),
  SeriesValidator.onUpdateSeries,
  SeriesController.onUpdateSeries
);
