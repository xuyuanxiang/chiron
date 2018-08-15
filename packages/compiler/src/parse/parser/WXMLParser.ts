import { parseFragment, DocumentFragment } from 'parse5';
import { Parser } from './Parser';
import { ContentType } from '../../program';

export class WXMLParser implements Parser<DocumentFragment> {
  async parse(content: string): Promise<DocumentFragment> {
    return parseFragment(content);
  }

  support(contentType: ContentType): boolean {
    return contentType === ContentType.WXML;
  }
}
