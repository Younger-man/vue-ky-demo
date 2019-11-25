/* eslint-disable  global-require */
const { parseArgv } = require('./build/utils');

const options = {
  production: require('./build/production.js'),
  test: require('./build/test.js'),
  dev: require('./build/dev.js'),
};

const env = parseArgv(process.argv.slice(2), 'environment');
module.exports = options[env] || options.dev;
