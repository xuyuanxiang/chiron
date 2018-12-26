import Config from 'webpack-chain';
import { inspect } from 'util';
import { EOL } from 'os';
import { existsSync, accessSync, statSync, readFileSync } from 'fs';
import { resolve } from 'path';
import serve from 'webpack-serve';
import fail from '../util/fail';
import { script, css, dev, html } from '../webpack';
import '../autoInjectGlobals';
import '../autoPatchLog';

const context = process.cwd();
const configFile = resolve(context, './chiron.config.js');
const pkgFile = resolve(context, './package.json');
const main = resolve(context, './src/index.js');
const pagesDir = resolve(context, './src/pages');

let dependencies = {};
try {
  accessSync(pkgFile);
  if (existsSync(pkgFile) && statSync(pkgFile).isFile()) {
    try {
      const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'));
      dependencies = pkg.dependencies;
    } catch (e) {
      console.error(`${pkgFile} 文件中JSON格式错误`);
    }
  }
} catch (e) {}

try {
  accessSync(main);
} catch (e) {
  fail(`${main} 文件不存在或没有访问权限！`);
}

if (!existsSync(main) || !statSync(main).isFile()) {
  fail(`${main} 文件不存在！`);
}

const config = new Config();

config.context(context).mode('development');

script(config);
css(config);
dev(config);
html(config);

try {
  accessSync(configFile);
  if (existsSync(configFile) && statSync(configFile).isFile()) {
    const module = require(configFile);
    if (typeof module === 'object' && typeof module.webpack === 'function') {
      console.warn('加载自定义配置文件：', configFile);
      module.webpack(config);
      console.warn(`应用自定义配置：${EOL}`, inspect(config.toConfig(), { depth: 4 }));
    }
  }
} catch (e) {}

serve({}, { config: config.toConfig() }).then(result => {});
