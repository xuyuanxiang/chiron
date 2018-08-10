export interface WXTabBarItem {
  pagePath: string;
  text: string;
  iconPath?: string;
  selectedIconPath?: string;
}

export interface WxTabBarConfig {
  color: string;
  selectedColor: string;
  backgroundColor: string;
  list: WXTabBarItem[];
  borderStyle?: 'black' | 'white';
  position?: 'bottom' | 'top';
}