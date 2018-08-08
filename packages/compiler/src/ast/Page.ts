import { Node } from './Node';
import { File } from './File';

export interface PageConfig {
  disableScroll?: boolean;
  onReachBottomDistance?: number;
  enablePullDownRefresh: boolean;
  backgroundTextStyle: string;
  backgroundColor: string;
  navigationBarTitleText: string;
  navigationBarTextStyle: string;
  navigationBarBackgroundColor: string;
}

export class Page implements Node {
  readonly type: string = 'Page';
  readonly route: string;
  readonly files: File[];
  readonly config?: PageConfig;

  constructor(route: string, files: File[], config?: PageConfig) {
    this.route = route;
    this.files = files;
    this.config = config;
  }
}
