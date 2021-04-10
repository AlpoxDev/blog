const dev = process.env.NODE_ENV === 'development';

const devConfig = {
  NODE_ENV: 'dev',
  BASE_URL: '',
};

const prodConfig = {
  NODE_ENV: 'prod',
  BASE_URL: '',
};

const config = dev ? devConfig : prodConfig;

export default config;
