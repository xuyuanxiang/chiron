module.exports = {
  webpack(config) {
    /**
     * add @babel/polyfill
     * @see webpack-chain
     */
    config.when(config.get('mode') === 'production', config => {
      config
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
        }));
    });
  },
};
