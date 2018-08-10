import { build } from './factory';
import { Options } from './weixin';

export interface GetStorageAsyncOptions extends Options {
  key: string;
}

export interface SetStorageAsyncOptions extends GetStorageAsyncOptions {
  data: any;
}

export const getStorage = build(function getStorage({
  key,
}: GetStorageAsyncOptions) {
  return getStorageSync(key);
});

export const setStorage = build(function setStorage({
  key,
  data,
}: SetStorageAsyncOptions) {
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
