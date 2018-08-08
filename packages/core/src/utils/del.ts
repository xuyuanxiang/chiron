import { existsSync, statSync, readdirSync, unlinkSync, rmdirSync } from 'fs';
import { resolve } from 'path';

export function del(file: string): void {
  if (!existsSync(file)) {
    return;
  }
  const stats = statSync(file);
  if (stats.isFile()) {
    console.debug(`del file: ${file}`);
    unlinkSync(file);
  } else if (stats.isDirectory()) {
    const children = readdirSync(file);
    if (children && children.length) {
      children.map(it => resolve(file, it)).forEach(del);
    }
    rmdirSync(file);
    console.debug(`del dir: ${file}`);
  }
}
