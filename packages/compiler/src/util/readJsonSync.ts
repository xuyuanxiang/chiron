import { readFileSync, statSync, existsSync } from 'fs';

export function readJsonSync<T>(
  jsonFile: string,
  encoding: string = 'utf8',
): T | null | never {
  if (existsSync(jsonFile) && statSync(jsonFile).isFile()) {
    return JSON.parse(readFileSync(jsonFile, encoding));
  }

  return null;
}
