export interface AppHooksOptions {
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

export interface AppArguments {
  globalData: any;

  onLaunch(options: AppHooksOptions): void;

  onShow(options: AppHooksOptions): void;

  onHide(): void;

  onError(): void;

  onPageNotFound(options: AppHooksOptions): void;

  [prop: string]: any;
}

export function App(args: AppArguments) {}
