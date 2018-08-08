import { createHash } from 'crypto';
import { Node } from './Node';

export enum ContentType {
  JS = 'js',
  WXSS = 'wxss',
  WXML = 'wxml',
  WXS = 'wxs',
  CONFIG = 'json',
}

export type DependencyMap = { [relativePath: string]: File };

export class File implements Node {
  readonly type: string = 'File';
  readonly start: number = 0;
  readonly end: number;
  readonly md5: string;
  readonly filename: string;
  readonly content: string;
  readonly contentType: ContentType;
  readonly dependencies?: DependencyMap;

  constructor(filename: string, content: string, contentType: ContentType) {
    const hash = createHash('md5');
    hash.update(content);
    this.md5 = hash.digest('hex');
    this.filename = filename;
    this.content = content;
    this.contentType = contentType;
    this.end = content.length;
    this.dependencies = {};
  }
}
