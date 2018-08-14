export interface WxPageLifecycleHook {
  onLoad(query: { [key: string]: any }): void;

  onShow(): void;

  onReady(): void;

  onHide(): void;

  onUnload(): void;

  onPullDownRefresh(): void;

  onReachBottom(): void;

  onShareAppMessage(): void;

  onPageScroll(params: { scrollTop: number }): void;

  onTabItemTap(params: { index: String; pagePath: string; text: String }): void;
}
