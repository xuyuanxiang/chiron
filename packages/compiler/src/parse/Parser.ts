import { Program, SourceType } from '../ast/Program';

export interface Parser<AST> {
  support(sourceType: SourceType): boolean;

  parse(sourceCode: string): Promise<Program<AST>>;
}
