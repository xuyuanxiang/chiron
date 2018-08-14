import { WxApiOptions } from './WxApiOptions';

export interface WxApiRequestOptions extends WxApiOptions {
  url: string;
  data?: string | ArrayBuffer | { [key: string]: any };
  header?: { [key: string]: any };
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT';
  dataType?: 'json';
  responseType?: 'text' | 'arraybuffer';
}
