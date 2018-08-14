import { WxApiCallbackArgument } from './WxApiCallbackArgument';

/**
 * 微信接口调用成功的回调函数
 */
export interface WxApiSuccessCallback {
  (arg: WxApiCallbackArgument): void;
}
