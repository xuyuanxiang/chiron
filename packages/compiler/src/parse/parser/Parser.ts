import { ContentType } from '../../program';

export interface Parser<AST> {
  support(contentType: ContentType): boolean;

  parse(content: string): Promise<AST>;
}
