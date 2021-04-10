import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import merge from 'webpack-merge';
import { commonConfig } from './webpack.common';

export const prodConfig = merge<Configuration>(commonConfig, {
  output: {
    filename: 'index.stage.js',
    path: path.join(__dirname, '../build'),
  },
  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('stage') }),
  ],
});

module.exports = prodConfig;
