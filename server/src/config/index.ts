import path from 'path';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

const env = process.env;
const NODE_ENV = env.NODE_ENV || 'dev';
const DEV = NODE_ENV === 'dev';
const ENV_PATH = path.join(process.cwd(), `env/.env.${NODE_ENV}`);

dotenv.config({ path: ENV_PATH });

export const devConfig = {
  NODE_ENV,

  sequelize: {
    host: env.DB_HOST,
    port: (env.DB_PORT || 0) as number,
    database: env.DB_DATABASE || '',
    dialect: (env.DB_DIALECT || 'sqlite') as Dialect,
    username: env.DB_USERNAME || '',
    password: env.DB_PASSWORD || '',
  },

  SALT_ROUNDS: 3,
  MAX_LIMIT: 10,
  JWT_SECRET: env.JWT_SECRET || 'jwt-dev-secret',
};

export const prodConfig = {
  NODE_ENV,

  sequelize: {
    host: env.DB_HOST,
    port: (env.DB_PORT || 0) as number,
    database: env.DB_DATABASE || '',
    dialect: (env.DB_DIALECT || 'sqlite') as Dialect,
    username: env.DB_USERNAME || '',
    password: env.DB_PASSWORD || '',
  },

  SALT_ROUNDS: 13,
  MAX_LIMIT: 20,
  JWT_SECRET: env.JWT_SECRET || 'jwt-secret',
};

export default DEV ? devConfig : prodConfig;
