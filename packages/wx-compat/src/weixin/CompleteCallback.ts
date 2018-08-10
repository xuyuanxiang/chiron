import { CallbackArgument } from './CallbackArgument';

/**
 * 微信接口调用结束的回调函数（调用成功、失败都会执行）
 */
export interface CompleteCallback {
  (arg: CallbackArgument): void;
}
