const path = require('path');

const resolve = dir => path.resolve(__dirname, '..', dir);

function parseArgv(list, name) {
  const reg = new RegExp(`-{0,2}${name}(=|\\s*)(\\w+)`);

  let result;
  list.forEach(item => {
    const match = item.match(reg);
    if (match && match[2]) {
      // eslint-disable-next-line prefer-destructuring
      result = match[2];
    }
  });

  return result;
}

module.exports = {
  resolve,
  parseArgv,
};
