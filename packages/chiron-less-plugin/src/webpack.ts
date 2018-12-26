import Config from 'webpack-chain';

export function webpack(
  config: Config,
  { browserslist = ['>= 0.5% in CN'] }: { browserslist?: string[] } = {
    browserslist: ['>= 0.5% in CN'],
  },
): void {
  config.resolve.extensions
    .merge(['.less'])
    .end()
    .end()
    .module// 项目样式
    .rule(global.__CHIRON_RULE_LESS__)
    .test(/\.less$/)
    .include.add(global.__CHIRON_DIR_SRC__)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use(global.__CHIRON_LOADER_STYLE__)
    .loader(require.resolve('style-loader'))
    .end()
    .use(global.__CHIRON_LOADER_CSS__)
    .loader(require.resolve('css-loader'))
    .options({
      modules: true,
      importLoaders: 2,
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
    })
    .end()
    .use(global.__CHIRON_LOADER_LESS__)
    .loader(require.resolve('less-loader'))
    .options({
      javascriptEnabled: true,
      sourceMap: config.get('mode') === 'development' ? { sourceMapFileInline: true } : null,
    })
    .end()
    .end()
    // 项目依赖（node_modules)的样式
    .rule(global.__CHIRON_RULE_3RD_LESS__)
    .test(/\.less$/)
    .exclude.add(global.__CHIRON_DIR_SRC__)
    .end()
    .include.add(/node_modules/)
    .end()
    .use(global.__CHIRON_LOADER_STYLE__)
    .loader(require.resolve('style-loader'))
    .end()
    .use(global.__CHIRON_LOADER_CSS__)
    .loader(require.resolve('css-loader'))
    .options({
      importLoaders: 1,
      sourceMap: config.get('mode') === 'development',
    })
    .end()
    .use(global.__CHIRON_LOADER_LESS__)
    .loader(require.resolve('less-loader'))
    .options({
      javascriptEnabled: true,
      sourceMap: config.get('mode') === 'development' ? { sourceMapFileInline: true } : null,
    });
}
