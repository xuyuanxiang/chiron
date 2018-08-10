import { WxApiSuccessCallback } from './WxApiSuccessCallback';
import { WxApiFailCallback } from './WxApiFailCallback';
import { WxApiCompleteCallback } from './WxApiCompleteCallback';

export interface WxApiOptionsEnsured {
  success: WxApiSuccessCallback;
  fail: WxApiFailCallback;
  complete: WxApiCompleteCallback;
}
