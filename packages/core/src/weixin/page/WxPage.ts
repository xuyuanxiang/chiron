import { WxPageDelegate } from './WxPageDelegate';

export interface WxPage<Data = {}> extends WxPageDelegate<Data> {
  route: string;
}
