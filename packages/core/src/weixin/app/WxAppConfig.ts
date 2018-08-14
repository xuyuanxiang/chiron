import { WxAppWindowConfig } from './WxAppWindowConfig';
import { WxAppTabBarConfig } from './WxAppTabBarConfig';

export interface WxAppConfig {
  pages?: string[];
  window?: WxAppWindowConfig;
  tabBar?: WxAppTabBarConfig;
}
