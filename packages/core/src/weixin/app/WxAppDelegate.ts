import { WxAppLifecycleHook } from './WxAppLifecycleHook';

export interface WxAppDelegate<GlobalData = {}> extends WxAppLifecycleHook {
  globalData: GlobalData;

  [prop: string]: any;
}
