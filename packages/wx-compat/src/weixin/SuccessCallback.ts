import { CallbackArgument } from './CallbackArgument';

/**
 * 微信接口调用成功的回调函数
 */
export interface SuccessCallback {
  (arg: CallbackArgument): void;
}
