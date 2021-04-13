import express from 'express';

// loaders
import config from './config';
import expressLoader from './loaders/express'; // express
import typediLoader from './loaders/typedi'; // typedi

console.log(`Config Loading...`, config);

const app = express();

console.log(`Service Loading...`);
typediLoader();

console.log(`Express Loading...`);
expressLoader(app);

export default app;
