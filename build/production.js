const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { InsertHbsCodeWebpackPlugin, ReplaceModuleResolvePlugin } = require('kuyin-webpack-plugins');
const { resolve } = require('./utils.js');

const hbsCode = fs.readFileSync(resolve('public/index.hbs'), { encoding: 'utf-8' });

module.exports = {
  publicPath: '//h5res.kuyin123.com/client',
  assetsDir: 'iosh5',
  indexPath: 'index.hbs',
  // Disable source map for build performance
  productionSourceMap: false,
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
  // https://github.com/neutrinojs/webpack-chain/tree/v4#chainedmap
  chainWebpack: config => {
    // Do not lint js files(js files are generated files, not source code)
    config.module.rule('eslint').test(/\.(vue|tsx?)$/);

    // Ignore mock.hbs
    // args是个二维数组，有点奇怪
    config.plugin('copy').tap(args => {
      args[0][0].ignore.unshift('mock.hbs', 'index.hbs', 'test.hbs');
      return [...args];
    });
  },
};
