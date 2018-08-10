export function noop() {}

export function isFunction(f) {
  return typeof f === 'function';
}

export function isDefined(o) {
  return typeof o !== 'undefined';
}

export function isString(s) {
  return typeof s === 'string';
}

export function compose(f = noop, g = noop) {
  return function(...args) {
    f(g(...args));
  };
}

export function guard(actual = noop) {
  return function(
    { success = noop, fail = noop, complete = noop, ...args } = {
      success: noop,
      fail: noop,
      complete: noop,
    },
  ) {
    actual({ ...args, success, fail, complete });
  };
}

export function apply(obj, method, args) {
  if (obj && typeof obj[method] === 'function') {
    obj[method].apply(obj, args);
  }
}

export function asyncImport(src, done) {
  if (isDefined(window)) {
    const script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = done;
    window.document.querySelector('head').appendChild(script);
  } else {
    import(src).then(done);
  }
}

export function bind(target, event, handler) {
  if (
    target &&
    typeof isFunction(target.addEventListener) &&
    isFunction(handler) &&
    isString(event)
  ) {
    target.addEventListener(event, handler, false);
  }
}

export const bindWindow = isDefined(window)
  ? compose(
      bind,
      (event, handler) => [window, event, handler],
    )
  : noop;
