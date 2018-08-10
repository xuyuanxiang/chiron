import { guard, compose } from './utils';

export const redirectTo = guard(({ url, success, fail, complete }) => {
  if (typeof history !== 'undefined') {
    history.pushState(null, '', url);
  }
});

export function getStorageSync() {}

export function setStorageSync() {}

export function login() {}

export function getSetting() {}
