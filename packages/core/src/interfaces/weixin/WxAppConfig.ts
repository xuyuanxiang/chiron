import { WxWindowConfig } from './WxWindowConfig';
import { WxTabBarConfig } from './WxTabBarConfig';

export interface WxAppConfig {
  pages?: string[];
  window?: WxWindowConfig;
  tabBar?: WxTabBarConfig;
}
