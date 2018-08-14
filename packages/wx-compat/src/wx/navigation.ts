import { WxApiNavigationOptions } from 'chiron-core';
import { build } from '../utils';

export const redirectTo = build(function redirectTo({
  url,
}: WxApiNavigationOptions) {
  if (typeof history !== 'undefined') {
    history.replaceState(null, '', url);
  }
});
