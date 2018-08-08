import { lookup } from 'dns';
import { join } from 'path';
import { readFileSync, writeFileSync, statSync, existsSync } from 'fs';
import { sync as spawn } from 'cross-spawn';
import { del } from '../../../core/src/utils/del';

export function init(dir: string = '.') {
  lookup('github.com', err => {
    if (err) {
      fallback(dir);
    } else {
      try {
        clone('https://github.com/xuyuanxiang/chiron-starter.git', dir);
      } catch (e) {
        fallback(dir);
      }
    }
  });
}

function fallback(dir: string): void {
  lookup('gitee.com', err => {
    if (err) {
      throw err;
    } else {
      clone('https://gitee.com/xuyuanxiang/chiron-starter.git', dir);
    }
  });
}

function clone(repository: string, dir: string): never | void {
  const result = spawn('git', ['clone', repository, dir]);
  if (result.error) {
    throw result.error;
  }
  initialize(dir);
}

function initialize(dir: string): void {
  const context = process.cwd();
  const root = join(context, dir);
  del(join(root, '.git'));
  const pkgFile = join(root, 'package.json');
  if (existsSync(pkgFile) && statSync(pkgFile).isFile()) {
    const pkgStr = readFileSync(pkgFile, 'utf8');
    const pkgJson = JSON.parse(pkgStr);
    pkgJson.name = dir;
    writeFileSync(pkgFile, JSON.stringify(pkgJson, null, 2));
  }
}
