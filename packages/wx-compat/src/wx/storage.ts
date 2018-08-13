import { WxApiGetStorageOptions, WxApiSetStorageOptions } from 'chiron-core';
import { build } from '../utils';

export const getStorage = build(function getStorage({
  key,
}: WxApiGetStorageOptions) {
  return getStorageSync(key);
});

export const setStorage = build(function setStorage({
  key,
  data,
}: WxApiSetStorageOptions) {
  return setStorageSync(key, data);
});

export function getStorageSync(key: string): any | never {
  const result = localStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return result;
}

export function setStorageSync(key: string, data: any): void | never {
  localStorage.setItem(
    key,
    typeof data === 'string' ? data : JSON.stringify(data),
  );
}
