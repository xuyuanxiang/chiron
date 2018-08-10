export interface WxWindowConfig {
  navigationBarBackgroundColor?: string;
  navigationBarTextStyle?: 'black' | 'white';
  navigationBarTitleText: string;
  backgroundColor?: string;
  backgroundTextStyle: 'dark' | 'light';
  enablePullDownRefresh?: boolean;
  onReachBottomDistance: number;
}
