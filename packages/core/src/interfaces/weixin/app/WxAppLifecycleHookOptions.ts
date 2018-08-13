export interface WxAppLifecycleHookOptions {
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
