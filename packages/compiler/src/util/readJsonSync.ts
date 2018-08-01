import { readFileSync, statSync, existsSync } from 'fs';

export function readJsonSync(jsonFile: string): { [key: string]: any } | never {
  if (existsSync(jsonFile) && statSync(jsonFile).isFile()) {
    return JSON.parse(readFileSync(jsonFile, 'utf8'));
  }

  return {};
}
