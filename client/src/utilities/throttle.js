export default function throttle(interval, throttledFunction) {
  if (interval <= 0) {
    return throttledFunction;
  }
  let lastTrigger = 0;
  let timeout;
  let lastArguments;
  return function () {
    lastArguments = arguments;
    if (timeout) {
      return;
    }
    let context = this;
    let now = +Date.now();
    let delay = interval - now + lastTrigger;
    if (delay <= 0) {
      lastTrigger = now;
      throttledFunction.apply(context, lastArguments);
    } else {
      timeout = setTimeout(function () {
        lastTrigger = now;
        timeout = null;
        throttledFunction.apply(context, lastArguments);
      }, delay);
    }
  };
}
