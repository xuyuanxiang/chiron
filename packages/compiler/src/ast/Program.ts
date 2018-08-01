import { Node } from './Node';

export enum SourceType {
  JS = 'JS',
  WXSS = 'WXSS',
  WXML = 'WXML',
  WXS = 'WXS',
}

export class Program implements Node {
  type: string = 'Program';
  start: number = 0;
  end: number;
  sourceType: SourceType;

  constructor(sourceType: SourceType, end: number) {
    this.sourceType = sourceType;
    this.end = end;
  }
}
