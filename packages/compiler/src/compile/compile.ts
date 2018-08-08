import { resolve } from 'path';
import { CompileOptions } from './CompileOptions';
import { DomTarget } from './DomTarget';
import { readJsonSync } from '../util/readJsonSync';
import { AppConfig } from '../ast/App';

export async function compile({
  cwd = process.cwd(),
  target = DomTarget,
}: CompileOptions): Promise<string> {
  return '';
}
