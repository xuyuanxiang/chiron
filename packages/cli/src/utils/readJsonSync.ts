import { existsSync, statSync, readFileSync } from 'fs';

export function readJsonSync<T>(path: string): never | T | undefined {
  if (existsSync(path) && statSync(path).isFile()) {
    const content = readFileSync(path, 'utf8');
    if (content) {
      return JSON.parse(content);
    }
  }
}
