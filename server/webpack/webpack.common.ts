import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
// import TerserPlugin from 'terser-webpack-plugin';

export const commonConfig: Configuration = {
  target: 'node',
  mode: 'development',
  entry: path.join(__dirname, '../src/index.ts'),
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../build'),
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: ['/node_modules'] }],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      url: false,
      buffer: false,
    },
  },
  optimization: {
    minimize: true,
    // minimizer: [new TerserPlugin()],
  },
};
