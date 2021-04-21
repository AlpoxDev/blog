import jsonwebtoken from 'jsonwebtoken';
import config from '../config';

export type JWTPayload = {
  id: string;
};

export const signToken = (payload: JWTPayload, expiresIn = '12h') => {
  try {
    return jsonwebtoken.sign(payload, config.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw { status: 401, message: '토큰 생성 오류!' };
  }
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jsonwebtoken.verify(token, config.JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw { status: 400, message: '토큰 인증 오류!' };
  }
};
