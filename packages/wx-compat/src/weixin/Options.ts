import { SuccessCallback } from './SuccessCallback';
import { FailCallback } from './FailCallback';
import { CompleteCallback } from './CompleteCallback';

/**
 * 微信接口参数
 */
export interface Options {
  success?: SuccessCallback;
  fail?: FailCallback;
  complete?: CompleteCallback;
}
