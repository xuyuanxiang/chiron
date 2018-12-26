import HTMLPlugin from 'html-webpack-plugin';
import Config from 'webpack-chain';
import { accessSync, statSync } from 'fs';
import { resolve } from 'path';
import { equal } from 'assert';

export function html(config: Config): void {
  const options: any = { title: 'Chiron' };

  try {
    const template = resolve(global.__CHIRON_DIR_SRC__, 'document.ejs');
    accessSync(template);
    equal(statSync(template).isFile(), true);
    options.template = template;
  } catch (ignored) {}

  try {
    const favicon = resolve(global.__CHIRON_DIR_SRC__, 'favicon.ico');

    accessSync(favicon);
    equal(statSync(favicon).isFile(), true);
    options.favicon = favicon;
  } catch (ignored) {}

  if (config.get('mode') === 'production') {
    options.minify = {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    };
  }

  config.plugin(global.__CHIRON_PLUGIN_HTML__).use(HTMLPlugin, [options]);
}
