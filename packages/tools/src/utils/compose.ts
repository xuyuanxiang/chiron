import { noop } from './noop';

export function compose(f: Function = noop, g: Function = noop): Function {
  return function(...args: any[]) {
    f(g(...args));
  };
}
