import { Dialect } from 'sequelize';

const env = process.env;
const NODE_ENV = env.NODE_ENV || 'dev';

export const sequelizeConfig = {
  host: env.DB_HOST,
  port: (env.DB_PORT || 3306) as number,
  database: env.DB_DATABASE || '',
  dialect: (env.DB_DIALECT || 'mariadb') as Dialect,
  username: env.DB_USERNAME || '',
  password: env.DB_PASSWORD || '',
};

export const devConfig = {
  NODE_ENV,
  sequelize: sequelizeConfig,

  MAX_LIMIT: 10,
  SALT_ROUNDS: parseInt(env.SALT_ROUNDS as string, 10) || 1,
  JWT_SECRET: env.JWT_SECRET || 'jwt-dev-secret',
};

export const stageConfig = {
  NODE_ENV,
  sequelize: sequelizeConfig,

  MAX_LIMIT: 20,
  SALT_ROUNDS: parseInt(env.SALT_ROUNDS as string, 10) || 1,
  JWT_SECRET: env.JWT_SECRET || 'jwt-stage-secret',
};

export const prodConfig = {
  NODE_ENV,
  sequelize: sequelizeConfig,

  MAX_LIMIT: 20,
  SALT_ROUNDS: parseInt(env.SALT_ROUNDS as string, 10) || 1,
  JWT_SECRET: env.JWT_SECRET || 'jwt-prod-secret',
};

let config = devConfig;
if (NODE_ENV === 'stage') config = stageConfig;
if (NODE_ENV === 'prod') config = prodConfig;

export default config;
