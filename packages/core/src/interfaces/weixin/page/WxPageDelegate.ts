export interface WxPageDelegate<Data = {}> {
  data?: Data;

  setData(data: Data, callback: () => void): void;

  [key: string]: Function | { [key: string]: any } | undefined;
}
