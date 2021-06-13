import configJSON from '../../config.json';

const dev = process.env.NODE_ENV === 'development';

const defaultConfig = {
  nickname: configJSON.nickname,
  UPLOAD_SERVER_URL: configJSON.UPLOAD_SERVER_URL,
};

const devConfig = {
  ...defaultConfig,
  NODE_ENV: 'dev',
  // BASE_URL: 'https://blog-stage.alpox.dev',
  // BASE_URL: 'http://localhost:8080',
  BASE_URL: 'https://blog-prod.alpox.dev',
  // GITHUB_CLIENT_ID: '274c4a0583f8bdce55dd',
  GITHUB_CLIENT_ID: '7048b41eeea0eaf9a65a',
};

const prodConfig = {
  ...defaultConfig,
  NODE_ENV: 'prod',
  BASE_URL: 'https://blog-prod.alpox.dev',
  // BASE_URL: 'https://blog-stage.alpox.dev',
  GITHUB_CLIENT_ID: '7048b41eeea0eaf9a65a',
};

const config = dev ? devConfig : prodConfig;

export default config;
