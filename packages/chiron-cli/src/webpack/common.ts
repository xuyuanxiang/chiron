import Config from 'webpack-chain';
import * as path from 'path';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import CleanPlugin from 'clean-webpack-plugin';

const browserslist = ['>= 0.5% in CN'];

export default function(config: Config): void {
  config.resolve.extensions
    .merge(['.js'])
    .end()
    .end()
    .module.rule(global.__CHIRON_RULE_JS__) // babel
    .test(/\.js$/)
    .include.add(global.__CHIRON_DIR_SRC__)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use(global.__CHIRON_RULE_JS__STAGE_BABEL__)
    .loader(require.resolve('babel-loader'))
    .options({
      cacheDirectory:
        config.get('mode') === 'development'
          ? path.join(global.__CHIRON_DIR_DIST__, '.cache')
          : false,
      babelrc: false,
      preset: [['@babel/preset-env', { targets: browserslist }]],
    })
    .end()
    .end()
    .rule(global.__CHIRON_RULE_LESS__) // less
    .test(/\.less$/)
    .include.add(global.__CHIRON_DIR_SRC__)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use(global.__CHIRON_RULE_LESS_STAGE_STYLE_LOADER__)
    .loader(
      config.get('mode') === 'production'
        ? MiniCSSExtractPlugin.loader
        : require.resolve('style-loader'),
    )
    .end()
    .use(global.__CHIRON_RULE_LESS_STAGE_CSS_LOADER__)
    .loader(require.resolve('css-loader'))
    .options({
      modules: true,
      importLoaders: 2,
      localIdentName: '[local]-[hash:8]',
      sourceMap: config.get('mode') === 'development',
    })
    .end()
    .use(global.__CHIRON_RULE_LESS_STAGE_POSTCSS_LOADER__)
    .loader(require.resolve('postcss-loader'))
    .options({
      ident: 'postcss',
      sourceMap: config.get('mode') === 'development' ? 'inline' : false,
      plugins: () => [require('postcss-preset-env')({ browsers: browserslist })],
    })
    .end()
    .use(global.__CHIRON_RULE_LESS_STAGE_LESS_LOADER__)
    .loader(require.resolve('less-loader'))
    .options({
      javascriptEnabled: true,
      sourceMap: config.get('mode') === 'development' ? { sourceMapFileInline: true } : null,
    })
    .end()
    .end()
    .end()
    .when(config.get('mode') === 'production', config =>
      config.plugin('css-extract').use(MiniCSSExtractPlugin),
    )
    .plugin('clean')
    .use(CleanPlugin, [
      [config.output.get('path') || global.__CHIRON_DIR_SRC__],
      { root: config.get('context') },
    ]);
}
