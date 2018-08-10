import { WxAppLifecycleHookOptions } from './WxAppLifecycleHookOptions';

export interface WxAppLifecycleHook {
  globalData: any;

  onLaunch(options: WxAppLifecycleHookOptions): void;

  onShow(options: WxAppLifecycleHookOptions): void;

  onHide(): void;

  onError(): void;

  onPageNotFound(options: WxAppLifecycleHookOptions): void;

  [prop: string]: any;
}
