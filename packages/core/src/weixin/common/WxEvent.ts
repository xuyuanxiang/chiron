import { WxEventOptions } from './WxEventOptions';

export interface WxEvent {
  name: string;
  detail: any;
  options?: WxEventOptions;
}
