import Config from 'webpack-chain';
import history from 'connect-history-api-fallback';
import convert from 'koa-connect';
import * as path from 'path';

export default function(config: Config) {
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
      .exclude.add(path.join(config.get('context'), 'src'))
      .end()
      .include.add(/node_modules/)
      .end()
      .use('source-map')
      .loader(require.resolve('source-map-loader'));
  });
}
