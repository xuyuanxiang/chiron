import { CompileTarget } from './CompileTarget';
import { AST } from '../ast/AST';

export interface CompileOptions {
  cwd: string;
  ast: AST;
  target: CompileTarget;
}
