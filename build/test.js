const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { InsertHbsCodeWebpackPlugin, ReplaceModuleResolvePlugin } = require('kuyin-webpack-plugins');
const { resolve } = require('./utils.js');
const production = require('./production.js');

const hbsCode = fs.readFileSync(resolve('public/test.hbs'), { encoding: 'utf-8' });

module.exports = {
  ...production,
  assetsDir: 'iosh5',
  publicPath: '/client',
  configureWebpack: {
    // https://github.com/webpack/docs/wiki/how-to-write-a-plugin
    plugins: [
      new InsertHbsCodeWebpackPlugin({
        placeholder: /<span\s*hbs-place-holder\s*>\s*<\s*\/span\s*>/,
        hbsCode,
      }),
    ],
    resolve: {
      plugins: [
        new ReplaceModuleResolvePlugin({
          sourceModule: 'soundmanager2',
          destModule: 'soundmanager2-nodebug-jsmin.js',
        }),
      ],
    },
  },
};
