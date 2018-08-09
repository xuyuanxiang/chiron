export interface AppWindow {
  navigationBarBackgroundColor?: string;
  navigationBarTextStyle?: 'black' | 'white';
  navigationBarTitleText: string;
  backgroundColor?: string;
  backgroundTextStyle: 'dark' | 'light';
  enablePullDownRefresh?: boolean;
  onReachBottomDistance: number;
}

export interface AppTabBarItem {
  pagePath: string;
  text: string;
  iconPath?: string;
  selectedIconPath?: string;
}

export interface AppTabBar {
  color: string;
  selectedColor: string;
  backgroundColor: string;
  list: AppTabBarItem[];
  borderStyle?: 'black' | 'white';
  position?: 'bottom' | 'top';
}

export interface AppConfig {
  pages?: string[];
  window?: AppWindow;
  tabBar?: AppTabBar;
}
