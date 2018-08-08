import { Node } from './Node';

export enum SourceType {
  JS = 'js',
  WXSS = 'wxss',
  WXML = 'wxml',
  WXS = 'wxs',
}

export class Program implements Node {
  readonly type: string = 'Program';
  readonly start: number = 0;
  readonly end: number;
  readonly sourceType: SourceType;
  readonly sourceCode: string;
  readonly ast: Node;

  constructor(sourceType: SourceType, sourceCode: string = '', ast: Node) {
    this.sourceType = sourceType;
    this.sourceCode = sourceCode;
    this.ast = ast;
    this.end = sourceCode.length;
  }
}
