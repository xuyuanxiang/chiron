import Config from 'webpack-chain';
import VuePlugin from 'vue-loader/lib/plugin';

export function webpack(config: Config) {
  config.resolve.extensions.add('.vue');

  // 添加vue-loader
  config.module
    .rule(global.__CHIRON_RULE_VUE__)
    .test(/\.vue$/)
    .include.add(global.__CHIRON_DIR_SRC__)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use(global.__CHIRON_LOADER_VUE__)
    .loader(require.resolve('vue-loader'));

  // 开发环境下, 将style-loader替换为: vue-style-loader
  config.when(config.get('mode') === 'development', config => {
    config.module
      .rule(global.__CHIRON_RULE_LESS__)
      .use(global.__CHIRON_LOADER_STYLE__)
      .loader(require.resolve('vue-style-loader'));
  });

  // 添加vue plugin
  config.plugin(global.__CHIRON_PLUGIN_VUE__).use(VuePlugin);

  // config.merge({
  //     externals: {
  //         'vue': 'Vue',
  //     }
  // });
}
