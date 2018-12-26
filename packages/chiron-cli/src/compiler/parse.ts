import { resolve } from 'path';
import { Project } from '../entity/Project';
import { readJsonFile } from '../util/readJson';

export function parse(context: string = process.cwd()): Project {
  const pkgFile = resolve(context, './package.json');
  const main = resolve(context, './src/index.js');
  const pagesDir = resolve(context, './src/pages');

  const pkg = readJsonFile(pkgFile);

  return new Project(pkg.name, pkg.version);
}
