export interface WxAppWindowConfig {
  navigationBarBackgroundColor?: string;
  navigationBarTextStyle?: 'black' | 'white';
  navigationBarTitleText: string;
  backgroundColor?: string;
  backgroundTextStyle: 'dark' | 'light';
  enablePullDownRefresh?: boolean;
  onReachBottomDistance: number;
}
