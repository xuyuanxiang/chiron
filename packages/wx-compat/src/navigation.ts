import { build } from './factory';
import { Options } from './weixin';

export interface NavigatorOptions extends Options {
  url: string;
}

export const redirectTo = build(function redirectTo({ url }: NavigatorOptions) {
  if (typeof history !== 'undefined') {
    history.pushState(null, '', url);
  }
});
