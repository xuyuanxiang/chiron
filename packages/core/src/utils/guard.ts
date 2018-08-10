import { noop } from './noop';

export function guard(actual: Function = noop) {
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
