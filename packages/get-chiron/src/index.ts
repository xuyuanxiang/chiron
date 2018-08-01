import { sync } from 'cross-spawn';
import { dirname } from 'path';

const getRegistry = sync('npm', ['config', 'get', 'registry'], {
  stdio: 'pipe',
  encoding: 'utf8',
});

failIfy(getRegistry);

const registry = getRegistry.stdout;

const getYarnBin = sync('yarn', ['global', 'bin'], {
  stdio: 'pipe',
  encoding: 'utf8',
});

if (!fail(getYarnBin)) {
  const bin = getYarnBin.stdout;
  if (bin && typeof bin === 'string') {
    const prefix = dirname(bin);
    yarnInstall(prefix);
    process.exit(0);
  }
}

npmInstall();

function yarnInstall(prefix: string) {
  sync('npm', [
    'config',
    'set',
    'registry',
    'https://registry.npm.wosai-inc.com/',
  ]);
  sync('yarn', [
    'config',
    'set',
    'registry',
    'https://registry.npm.wosai-inc.com/',
  ]);
  sync('yarn', ['config', 'set', 'prefix', prefix]);
  sync('yarn', ['global', 'add', '@wosai/chiron-script', '--prefix', prefix], {
    stdio: 'inherit',
  });
  sync('yarn', ['config', 'set', 'registry', registry]);
  sync('npm', ['config', 'set', 'registry', registry], { stdio: 'inherit' });
}

function npmInstall() {
  sync('npm', [
    'config',
    'set',
    'registry',
    'https://registry.npm.wosai-inc.com/',
  ]);
  sync('npm', ['install', '-g', '@wosai/chiron-script'], { stdio: 'inherit' });
  sync('npm', ['config', 'set', 'registry', registry], { stdio: 'inherit' });
}

function failIfy(result?: { error?: Error }): void {
  if (result && result.error) {
    result.error.message && console.log(result.error.message);
    process.exit(1);
  }
}

function fail(result?: { error?: Error }): boolean {
  return Boolean(result && result.error);
}
