/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import { createBrotliCompress } from 'node:zlib';
import { JWTPayload, verifyToken } from '../../common';
import { User, UserPermission } from '../../models';

const BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;

export const extractAccessToken = (authorization?: string) => {
  if (!authorization) return null;

  const result = BEARER_TOKEN_PATTERN.exec(authorization);
  if (!result) return null;

  return result[1];
};

export const getAccessToken = (req: Request): string | null => {
  const authorizationHeader: any =
    req.headers['Authorization'] || req.headers['authorization'];
  return extractAccessToken(authorizationHeader);
};

export const getVerified = (req: Request): JWTPayload | null => {
  const accessToken = getAccessToken(req);
  if (!accessToken) throw { status: 400, message: 'NotFound accessToken' };

  const verified = verifyToken(accessToken);
  return verified;
};

export const Authorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verified = getVerified(req);
    if (!verified) throw { status: 401, message: 'Invalid Bearer Token' };

    const user = await User.findByPk(verified.id, {
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
  const accessToken = getAccessToken(req);

  if (accessToken) {
    const verified = verifyToken(accessToken);
    if (!verified) throw { status: 401, message: 'Invalid Bearer Token' };

    try {
      const user = await User.findByPk(verified.id);
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
    try {
      const verifed = getVerified(req);
      if (!verifed)
        throw {
          status: 400,
          message: `Authorization Failure: Permission Authorizer`,
        };

      const user = await User.findOne({
        where: { id: verifed.id },
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
