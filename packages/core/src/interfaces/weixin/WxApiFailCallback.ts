import { WxApiCallbackArgument } from './WxApiCallbackArgument';

/**
 * 微信接口调用失败的回调函数
 */
export interface WxApiFailCallback {
  (arg: WxApiCallbackArgument): void;
}
