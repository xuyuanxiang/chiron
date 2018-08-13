import { WxApiNavigationOptions, WxApi } from 'chiron-core';
import { build } from '../utils';

export const redirectTo: WxApi<WxApiNavigationOptions> = build(
  function redirectTo({ url }: WxApiNavigationOptions) {
    if (typeof history !== 'undefined') {
      history.replaceState(null, '', url);
    }
  },
);
