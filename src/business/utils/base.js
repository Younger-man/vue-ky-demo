/**
 * Create a cached version of a pure function.
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function(str) {
    const hit = cache[str];
    // eslint-disable-next-line no-return-assign
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
export const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

/**
 * Capitalize a string.
 */
export const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

export function isEmpty(val) {
  return val === null || val === undefined || val === '' || isEmptyObject(val);
}

export function isEmptyObject(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
}

export function identity(arg) {
  return arg;
}

export function isUndef(val) {
  return val === undefined || val === null;
}

export function copy(dest, source) {
  Object.keys(source).forEach(key => {
    dest[key] = source[key];
  });
}

export function throttle({ func = () => {}, wait = 200, frequency = 200 }) {
  let timeout = null;
  let lastExecuteTime = Date.now();

  return function(...rest) {
    const self = this;
    const currentTime = Date.now();

    if (currentTime - lastExecuteTime > frequency) {
      lastExecuteTime = Date.now();
      func.apply(self, rest);
    } else {
      timeout = setTimeout(function() {
        lastExecuteTime = Date.now();
        clearTimeout(timeout);
        timeout = null;
      }, wait);
    }
  };
}
