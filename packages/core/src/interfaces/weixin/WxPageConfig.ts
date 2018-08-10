export interface WxPageConfig {
  disableScroll?: boolean;
  onReachBottomDistance?: number;
  enablePullDownRefresh: boolean;
  backgroundTextStyle: string;
  backgroundColor: string;
  navigationBarTitleText: string;
  navigationBarTextStyle: string;
  navigationBarBackgroundColor: string;
  usingComponents?: { [tag: string]: string };
}
