import {
  WxApi,
  WxApiNavigationOptions,
  WxAppDelegate,
  WxPageDelegate,
  WxComponentOptions,
  WxPage,
} from 'chiron-core';

declare global {
  interface Window {
    wx: {
      redirectTo: WxApi<WxApiNavigationOptions>;
      getStorageSync: <T>(key: string) => T | null | never;
      setStorageSync: <T>(key: string, data: T) => void | never;
      [key: string]: WxApi<any> | Function;
    };

    App(delegate: WxAppDelegate<any>): void;

    getApp(): WxAppDelegate<any> | undefined;

    Page(delegate: WxPageDelegate<any>): void;

    getCurrentPages(): WxPage[];

    Component(options: WxComponentOptions): void;
  }
}
