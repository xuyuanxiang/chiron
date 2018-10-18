const AliyunOSSPlugin = require('aliyun-oss-webpack-plugin');
const { name, version } = require('./package.json');
module.exports = {
  webpack(config) {
    /**
     * custom config
     * @see webpack-chain
     */
    config.when(config.get('mode') === 'production', config =>
      config
        // add @babel/polyfill
        .entry('main')
        .prepend('@babel/polyfill')
        .end()
        .module.rule(global.__CHIRON_RULE_JS__)
        .use(global.__CHIRON_LOADER_BABEL__)
        .tap(options => ({
          ...options,
          presets: [
            ['@babel/preset-env', { useBuiltIns: 'entry', targets: '> 0.25% in CN' }],
            ...options.presets.slice(1),
          ],
        }))
        .end()
        .end()
        .end()
        .output.publicPath(`https://yours.domain/${name}/${version}/`)
        .plugin('aliyun-oss')
        .use(AliyunOSSPlugin, [
          {
            region: 'oss-cn-hangzhou',
            accessKeyId: '***',
            accessKeySecret: '***',
            bucket: 'your bucket',
          },
        ]),
    );
  },
};
