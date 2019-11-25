/**
 * 节流函数
 *
 * @param {Function} func  函数
 * @param {number}   delay 延迟执行时间
 * @param {number}   interval  最小触发间隔时间
 * @export
 */
function throttle(func, delay, interval) {
  let lastTime = Date.now();
  let timer = 0;

  return function throttle(...args) {
    clearTimeout(timer);
    const now = Date.now();
    if (now - lastTime < interval) {
      timer = window.setTimeout(() => {
        if (func) func.apply(this, args);
        lastTime = now;
      }, delay);
    } else {
      if (func) func.apply(this, args);
      lastTime = now;
    }
  };
}

export { throttle };
