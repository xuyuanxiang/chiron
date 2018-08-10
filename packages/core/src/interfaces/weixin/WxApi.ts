import { WxApiOptions } from './WxApiOptions';

export interface WxApi<T extends WxApiOptions> {
  (options: T): void;
}
