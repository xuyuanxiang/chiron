import { Parser } from './Parser';
import { ContentType } from '../../program';

export class ES6Parser implements Parser<any> {
  support(contentType: ContentType): boolean {
    return contentType === ContentType.JS;
  }

  async parse(content: string): Promise<any> {
    return content;
  }
}
