import { Node } from './Node';
import { Program } from './Program';

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
  pages: string[];
  window?: AppWindow;
  tabBar?: AppTabBar;
}

export class App implements Node {
  type: string = 'App';
  start: number = 0;
  end: number;
  config: AppConfig;
  program: Program;

  constructor(config: AppConfig, program: Program) {
    this.config = config;
    this.program = program;
    this.end = program.end;
  }
}