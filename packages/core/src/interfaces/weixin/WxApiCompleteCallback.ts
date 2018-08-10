import { WxApiCallbackArgument } from './WxApiCallbackArgument';

/**
 * 微信接口调用结束的回调函数（调用成功、失败都会执行）
 */
export interface WxApiCompleteCallback {
  (arg: WxApiCallbackArgument): void;
}
