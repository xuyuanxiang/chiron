import { isFunction } from './isFunction';
import { isString } from './isString';

export function bind(target: EventTarget, event: string, listener: EventListenerOrEventListenerObject) {
  if (target && typeof isFunction(target.addEventListener) &&
    isFunction(listener) && isString(event)) {
    target.addEventListener(event, listener, false);
  }
}
