/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { verifyToken } from '../../common';
import { User, UserPermission } from '../../models';

export const Authorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.signedCookies[config.COOKIE_NAME];
    if (!cookie)
      throw { status: 401, message: '사용자가 로그인이 되어있지 않습니다.' };

    const { id } = verifyToken(cookie);
    const user = await User.findByPk(id, {
      attributes: ['id', 'permission'],
    });

    if (user) {
      req.user = user;
      next();
    } else {
      throw { status: 401, message: 'NotFound user in Authorizer' };
    }
  } catch (error) {
    next(error);
  }
};

export const IfAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.signedCookies[config.COOKIE_NAME];
  if (cookie) {
    try {
      const { id } = verifyToken(cookie);
      const user = await User.findByPk(id, {
        attributes: ['id', 'permission'],
      });
      if (user) req.user = user;
      else throw { status: 404, message: 'NotFound user in Authorizer' };
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

export const PermissionAuthorizer = (permission: UserPermission) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.signedCookies[config.COOKIE_NAME];

    try {
      if (!cookie)
        throw { status: 401, message: '사용자가 로그인이 되어있지 않습니다.' };

      const { id } = verifyToken(cookie);
      const user = await User.findByPk(id, {
        attributes: ['id', 'permission'],
      });
      if (!user) throw { status: 404, message: 'NotFound user in Authorizer' };

      if (
        user.permission === permission ||
        user.permission == UserPermission.admin
      ) {
        req.user = user;
        next();
      } else {
        throw { status: 401, message: `Invalid Permission: ${permission}` };
      }
    } catch (error) {
      next(error);
    }
  };
};
