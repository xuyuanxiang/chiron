import { WxApiNavigationOptions } from 'chiron-core';
import { build } from './factory';

export const redirectTo = build(function redirectTo({
  url,
}: WxApiNavigationOptions) {
  if (typeof history !== 'undefined') {
    history.replaceState(null, '', url);
  }
});
