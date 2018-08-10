import { WxApiSuccessCallback } from './WxApiSuccessCallback';
import { WxApiFailCallback } from './WxApiFailCallback';
import { WxApiCompleteCallback } from './WxApiCompleteCallback';

/**
 * 微信接口参数
 */
export interface WxApiOptions {
  success?: WxApiSuccessCallback;
  fail?: WxApiFailCallback;
  complete?: WxApiCompleteCallback;
}
