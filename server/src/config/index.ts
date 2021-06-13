import { Dialect } from 'sequelize';
import { CookieOptions } from 'express';

const env = process.env;

export const sequelizeConfig = {
  host: env.DB_HOST,
  port: (env.DB_PORT || 3306) as number,
  database: env.DB_DATABASE || '',
  dialect: (env.DB_DIALECT || 'mariadb') as Dialect,
  username: env.DB_USERNAME || '',
  password: env.DB_PASSWORD || '',
};

const config = {
  NODE_ENV: env.NODE_ENV || 'dev',
  sequelize: sequelizeConfig,

  JWT_SECRET: env.JWT_SECRET || '',
  COOKIE_SECRET: env.COOKIE_SECRET || '',
  COOKIE_NAME: 'ALPOX',
  COOKIE_OPTIONS: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    signed: true,
    secure: env.NODE_ENV !== 'dev',
  } as CookieOptions,

  SALT_ROUNDS: parseInt(env.SALT_ROUNDS as string, 10) || 1,
  MAX_LIMIT: 20,

  GITHUB_CLIENT_ID: env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: env.GITHUB_CLIENT_SECRET || '',
};

export default config;
