import { existsSync, accessSync, statSync } from 'fs';

export function assertIsFile(path: string): void | never {
  try {
    accessSync(path);
  } catch (e) {
    fail(`${path} 文件不存在或没有访问权限！`);
  }
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(`${path} 文件不存在！`);
  }
}
