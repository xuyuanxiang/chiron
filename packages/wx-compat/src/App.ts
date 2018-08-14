import { WxAppDelegate } from 'chiron-core';

let _delegate: WxAppDelegate<any>;

export function App(delegate: WxAppDelegate<any>) {
  _delegate = delegate;
}

export function getApp(): WxAppDelegate | undefined {
  return _delegate;
}
