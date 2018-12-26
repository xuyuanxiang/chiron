import { readFileSync } from 'fs';
import { assertIsFile } from './assertIsFile';
import fail from './fail';

export function readJsonFile(path: string): { [name: string]: any } | never {
  assertIsFile(path);

  const content = readFileSync(path, 'utf8');

  try {
    return JSON.parse(content);
  } catch (e) {
    fail(`${path} 文件内容JSON格式错误！`);
    throw e;
  }
}
