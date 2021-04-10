import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import config from '../../config';

export const Paginate = (req: Request, res: Response, next: NextFunction) => {
  const { limit: queryLimit, page: queryPage, offset: queryOffset } = req.query;

  if (queryPage && queryOffset) {
    return next({
      status: 400,
      message: 'BadRequest: page and offset duplicated',
    });
  }

  let limit = 20;
  if (typeof queryLimit === 'string') limit = parseInt(queryLimit, 10) || 20;
  if (limit > config.MAX_LIMIT) limit = config.MAX_LIMIT;

  let offset = 0;
  if (typeof queryPage === 'string') {
    const page = parseInt(queryPage, 10);
    if (page && page > 1) {
      offset = (page - 1) * limit;
    }
  } else if (typeof queryOffset === 'string') {
    offset = parseInt(queryOffset, 10) || 0;
  }

  req.offset = offset;
  req.limit = limit;

  next();
};
