import { CompileTarget } from './CompileTarget';
import { AST } from '../ast/AST';

export interface CompileOptions {
  ast: AST;
  target: CompileTarget;
}
