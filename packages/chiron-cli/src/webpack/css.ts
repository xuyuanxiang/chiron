import Config from 'webpack-chain';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export function css(
  config: Config,
  { browserslist = ['>= 0.5% in CN'] }: { browserslist?: string[] } = {
    browserslist: ['>= 0.5% in CN'],
  },
): void {
  // css rule
  config.resolve.extensions.merge(['.css']);

  // 项目css
  config.module
    .rule(global.__CHIRON_RULE_CSS__)
    .test(/\.css$/)
    .exclude.add(/node_modules/)
    .end()
    .include.add(global.__CHIRON_DIR_SRC__)
    .end()
    .use(global.__CHIRON_LOADER_STYLE__)
    .loader(require.resolve('style-loader'))
    .end()
    .use(global.__CHIRON_LOADER_CSS__)
    .loader(require.resolve('css-loader'))
    .options({
      modules: true,
      importLoaders: 1,
      localIdentName: '[local]-[hash:8]',
      sourceMap: config.get('mode') === 'development',
    })
    .end()
    .use(global.__CHIRON_LOADER_POSTCSS__)
    .loader(require.resolve('postcss-loader'))
    .options({
      ident: 'postcss',
      sourceMap: config.get('mode') === 'development' ? 'inline' : false,
      plugins: () => [require('postcss-preset-env')({ browsers: browserslist })],
    });

  // 项目依赖（node_modules中) 的css
  config.module
    .rule(global.__CHIRON_RULE_3RD_CSS__)
    .test(/\.css$/)
    .include.add(/node_modules/)
    .end()
    .exclude.add(global.__CHIRON_DIR_SRC__)
    .end()
    .use(global.__CHIRON_LOADER_STYLE__)
    .loader(require.resolve('style-loader'))
    .end()
    .use(global.__CHIRON_LOADER_CSS__)
    .loader(require.resolve('css-loader'))
    .options({
      sourceMap: config.get('mode') === 'development',
    });

  // css压缩
  config.when(config.get('mode') === 'production', config => {
    config.plugin(global.__CHIRON_PLUGIN_CSS_MINIFY__).use(OptimizeCSSAssetsPlugin);
  });
}
