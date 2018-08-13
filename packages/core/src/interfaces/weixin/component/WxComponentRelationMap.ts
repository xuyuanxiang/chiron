import { WxComponent } from './WxComponent';

export interface WxComponentRelationMap {
  [relativePath: string]: {
    type: 'child';
    linked?(target: WxComponent): void;
    linkChanged?(target: WxComponent): void;
    unlinked?(target: WxComponent): void;
  };
}
