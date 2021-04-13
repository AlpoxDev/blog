"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodConfig = exports.devConfig = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const env = process.env;
const NODE_ENV = env.NODE_ENV || 'dev';
const DEV = NODE_ENV === 'dev';
const ENV_PATH = path_1.default.join(process.cwd(), `env/.env.${NODE_ENV}`);
dotenv_1.default.config({ path: ENV_PATH });
exports.devConfig = {
    NODE_ENV,
    sequelize: {
        host: env.DB_HOST,
        port: (env.DB_PORT || 0),
        database: env.DB_DATABASE || '',
        dialect: (env.DB_DIALECT || 'sqlite'),
        username: env.DB_USERNAME || '',
        password: env.DB_PASSWORD || '',
    },
    SALT_ROUNDS: 3,
    MAX_LIMIT: 10,
    JWT_SECRET: env.JWT_SECRET || 'jwt-dev-secret',
};
exports.prodConfig = {
    NODE_ENV,
    sequelize: {
        host: env.DB_HOST,
        port: (env.DB_PORT || 0),
        database: env.DB_DATABASE || '',
        dialect: (env.DB_DIALECT || 'sqlite'),
        username: env.DB_USERNAME || '',
        password: env.DB_PASSWORD || '',
    },
    SALT_ROUNDS: 13,
    MAX_LIMIT: 20,
    JWT_SECRET: env.JWT_SECRET || 'jwt-secret',
};
exports.default = DEV ? exports.devConfig : exports.prodConfig;
