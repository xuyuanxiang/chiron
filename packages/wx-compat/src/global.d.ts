import {
  WxApi,
  WxApiGetStorageOptions,
  WxApiNavigationOptions,
  WxApiSetStorageOptions,
  WxAppLifecycleHook,
} from 'chiron-core';

interface Window {
  wx: {
    redirectTo: WxApi<WxApiNavigationOptions>;
    getStorageSync: WxApi<WxApiGetStorageOptions>;
    setStorageSync: WxApi<WxApiSetStorageOptions>;
    [key: string]: WxApi<any>;
  };

  App(hooks: WxAppLifecycleHook): void;

  Page(): void;

  Component(): void;
}
