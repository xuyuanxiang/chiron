import HTMLPlugin from 'html-webpack-plugin';
import Config from 'webpack-chain';
import { accessSync, statSync } from 'fs';
import { resolve } from 'path';
import { equal } from 'assert';

export function html(config: Config): void {
  const options: any = { title: 'Chiron' };
  try {
    const template = resolve(global.__CHIRON_DIR_CWD__, 'document.ejs');
    accessSync(template);
    equal(statSync(template).isFile(), true);
    options.template = template;
  } catch (ignored) {}

  config.plugin(global.__CHIRON_PLUGIN_HTML__).use(HTMLPlugin, [options]);
}
