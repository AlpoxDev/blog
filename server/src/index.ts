import express from 'express';

// loaders
import './env'; // env
import config from './config';
import expressLoader from './loaders/express'; // express
import typediLoader from './loaders/typedi'; // typedi

let app: express.Application | undefined;

(() => {
  app = express();
  console.log(`Config Loading...`, config);

  console.log(`Service Loading...`);
  typediLoader();

  console.log(`Express Loading...`);
  expressLoader(app);
})();

export default app;
