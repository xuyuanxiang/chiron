import Config from 'webpack-chain';
import history from 'connect-history-api-fallback';
import convert from 'koa-connect';

export function dev(config: Config): void {
  config.when(config.get('mode') === 'development', config => {
    config.set('serve', {
      add: (app: any) => {
        const historyOptions = {
          // ... see: https://github.com/bripkens/connect-history-api-fallback#options
        };

        app.use(convert(history(historyOptions)));
      },
    });
    config.devtool('cheap-module-eval-source-map');
    config.module
      .rule('source-map')
      .test(/\.js$/)
      .pre()
      .exclude.add(global.__CHIRON_DIR_SRC__)
      .end()
      .include.add(/node_modules/)
      .end()
      .use('source-map')
      .loader(require.resolve('source-map-loader'));
  });
}
