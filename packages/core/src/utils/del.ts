import { existsSync, statSync, readdirSync, unlinkSync, rmdirSync } from 'fs';

export function del(file: string): void {
  if (!existsSync(file)) {
    return;
  }
  const stats = statSync(file);
  if (stats.isFile()) {
    unlinkSync(file);
  } else if (stats.isDirectory()) {
    const children = readdirSync(file);
    if (children && children.length) {
      children.forEach(del);
    } else {
      rmdirSync(file);
    }
  }
}
