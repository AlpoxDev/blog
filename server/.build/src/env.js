"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// import config from '../config';
if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'dev';
const NODE_ENV = process.env.NODE_ENV;
const ENV_PATH = path_1.default.join(process.cwd(), `env/.env.${NODE_ENV}`);
dotenv_1.default.config({ path: ENV_PATH });
