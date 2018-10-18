import Config from 'webpack-chain';

export default function(config: Config) {
  config.module
    .rule(global.__CHIRON_RULE_ANGULAR_JS__)
    .test(/\.html$/)
    .include.add(global.__CHIRON_DIR_SRC__)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use(global.__CHIRON_LOADER_HTML__)
    .loader(require.resolve('html-loader'));
  // config.merge({
  //     externals: {
  //         'angular': 'angular',
  //     }
  // });
}
