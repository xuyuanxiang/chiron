import { Parser } from './Parser';

export interface ParseOptions {
  cwd: string;
  encoding: string;
  parser?: Parser;
}
