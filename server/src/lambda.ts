import app from './app';
import serverlessExpress from '@vendia/serverless-express';

export const handler = serverlessExpress({ app });
