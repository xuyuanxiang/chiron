import { CompileTarget } from './CompileTarget';
import { Program } from '../program';

export interface CompileOptions {
  output: string;
  program: Program;
  target: CompileTarget;
}
