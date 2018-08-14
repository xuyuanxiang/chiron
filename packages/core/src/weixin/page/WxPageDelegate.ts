import { WxPageLifecycleHook } from './WxPageLifecycleHook';

export interface WxPageDelegate<Data = {}> extends WxPageLifecycleHook {
  data?: Data;

  setData(data: Data, callback: () => void): void;

  [key: string]: any;
}
