import configJSON from '../../config.json';

const dev = process.env.NODE_ENV === 'development';

const defaultConfig = {
  nickname: configJSON.nickname,
};

const devConfig = {
  ...defaultConfig,
  NODE_ENV: 'dev',
  BASE_URL: 'https://blog-stage.alpox.dev',
};

const prodConfig = {
  ...defaultConfig,
  NODE_ENV: 'prod',
  // BASE_URL: 'https://blog-prod.alpox.dev',
  BASE_URL: 'https://blog-stage.alpox.dev',
};

const config = dev ? devConfig : prodConfig;

export default config;
