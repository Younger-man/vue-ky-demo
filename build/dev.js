const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { InsertHbsCodeWebpackPlugin } = require('kuyin-webpack-plugins');
const { resolve } = require('./utils');

const mock = fs.readFileSync(resolve('public/mock.hbs'), { encoding: 'utf-8' });

module.exports = {
  configureWebpack: {
    plugins: [
      new InsertHbsCodeWebpackPlugin({
        placeholder: /<span\s*hbs-place-holder\s*>\s*<\s*\/span\s*>/,
        hbsCode: mock,
      }),
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        logLevel: 'debug',
        // target: 'http://order.diyring.cc',
        target: 'http://61.191.24.229:18000',
      },
    },
  },
  chainWebpack: config => {
    config.module.rule('eslint').test(/\.(vue|tsx?)$/);
  },
};
