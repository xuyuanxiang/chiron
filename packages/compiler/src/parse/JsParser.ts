import { Parser } from './Parser';
import { SourceType } from '../ast/Program';

export class JsParser implements Parser<any> {
  support(sourceType: SourceType): boolean {
    return sourceType === SourceType.JS;
  }

  async parse(sourceCode: string): Promise<any> {
    return sourceCode;
  }
}
