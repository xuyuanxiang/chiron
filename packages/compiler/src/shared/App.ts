export interface AppHookOptions {
  path: string;
  query: { [key: string]: any };
  scene?: number;
  shareTicket?: string;
  referrerInfo?: {
    appId: string;
    extraData?: any;
  };
  isEntryPage?: boolean;
}

export interface AppHook {
  globalData: any;

  onLaunch(options: AppHookOptions): void;

  onShow(options: AppHookOptions): void;

  onHide(): void;

  onError(): void;

  onPageNotFound(options: AppHookOptions): void;

  [prop: string]: any;
}

export function App(hook: AppHook) {}
