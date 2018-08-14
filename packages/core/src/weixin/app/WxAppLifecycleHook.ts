import { WxAppLifecycleHookOptions } from './WxAppLifecycleHookOptions';

export interface WxAppLifecycleHook {
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch(options: WxAppLifecycleHookOptions): void;

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow(options: WxAppLifecycleHookOptions): void;

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide(): void;

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError(): void;

  /**
   * 当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，详见下文
   */
  onPageNotFound(options: WxAppLifecycleHookOptions): void;
}
