import path from 'path';
import dotenv from 'dotenv';
// import config from '../config';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const NODE_ENV = process.env.NODE_ENV;
const ENV_PATH = path.join(__dirname, `../env/.env.${NODE_ENV}`);

dotenv.config({ path: ENV_PATH });
