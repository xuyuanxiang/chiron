import { CallbackArgument } from './CallbackArgument';

/**
 * 微信接口调用失败的回调函数
 */
export interface FailCallback {
  (arg: CallbackArgument): void;
}
