import { WxPageDelegate, WxPage } from 'chiron-core';

const _currentPages: WxPage[] = [];

export function Page(delegate: WxPageDelegate) {}

export function getCurrentPages(): WxPage[] {
  return _currentPages;
}
