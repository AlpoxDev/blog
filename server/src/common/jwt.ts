import jsonwebtoken from 'jsonwebtoken';

import { UserPermission } from '../models';
import config from '../config';

export type JWTPayload = {
  id: string;
  nickname?: string;
  profile?: string | null;
  permission?: UserPermission;
  accessToken?: string;
};

export const signToken = (payload: JWTPayload, expiresIn = '1d') => {
  try {
    return jsonwebtoken.sign(payload, config.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw { status: 401, message: '토큰 생성 오류!' };
  }
};

export const verifyToken = (token: string | null): JWTPayload | null => {
  if (!token) return null;

  try {
    return jsonwebtoken.verify(token, config.JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw { status: 400, message: '토큰 인증 오류!' };
  }
};
