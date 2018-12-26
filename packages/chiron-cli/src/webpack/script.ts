import Config from 'webpack-chain';
import * as path from 'path';
import CleanPlugin from 'clean-webpack-plugin';

export function script(
  config: Config,
  { browserslist = ['>= 0.5% in CN'] }: { browserslist?: string[] } = {
    browserslist: ['>= 0.5% in CN'],
  },
): void {
  config.resolve.extensions
    .merge(['.js', '.ts'])
    .end()
    .end()
    .module.rule(global.__CHIRON_RULE_JS__) // babel
    .test(/\.(j|t)s?$/)
    .include.add(global.__CHIRON_DIR_SRC__)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use(global.__CHIRON_RULE_JS__)
    .loader(require.resolve('babel-loader'))
    .options({
      cacheDirectory:
        config.get('mode') === 'development'
          ? path.join(global.__CHIRON_DIR_DIST__, '.cache')
          : false,
      babelrc: false,
      presets: [['@babel/preset-env', { targets: browserslist }], '@babel/preset-typescript'],
    });

  // clean plugin
  config
    .plugin('clean')
    .use(CleanPlugin, [
      [config.output.get('path') || global.__CHIRON_DIR_DIST__],
      { root: config.get('context') },
    ]);
}
