export * from './_models';

import { Sequelize } from 'sequelize-typescript';

import config from '../config';
import * as modelAttributes from './_models';

const sequelize = new Sequelize({
  ...config.sequelize,
  models: Object.values(modelAttributes)
    .map((value: any) => typeof value === 'function' && value)
    .filter(Boolean),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true,
  },
});

export default sequelize;
