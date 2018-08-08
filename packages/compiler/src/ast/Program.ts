import { Node } from './Node';

export enum SourceType {
  JS = 'js',
  WXSS = 'wxss',
  WXML = 'wxml',
  WXS = 'wxs',
}

export class Program implements Node {
  type: string = 'Program';
  start: number = 0;
  end: number;
  sourceType: SourceType;
  sourceCode: string;

  constructor(sourceType: SourceType, sourceCode: string = '') {
    this.sourceType = sourceType;
    this.sourceCode = sourceCode;
    this.end = sourceCode.length;
  }
}
