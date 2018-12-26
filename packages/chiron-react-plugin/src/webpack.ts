import Config from 'webpack-chain';

export function webpack(config: Config): void {
  config.resolve.extensions
    .add('.jsx')
    .add('.tsx')
    .end()
    .end()
    .module.rule(global.__CHIRON_RULE_REACT__)
    .test(/\.(j|t)sx?$/)
    .use(global.__CHIRON_LOADER_BABEL__)
    .tap(options => {
      const presets: any[] = [];
      if (options && Array.isArray(options.presets)) {
        options.presets.forEach(it => {
          let preset;
          if (Array.isArray(it)) {
            preset = it[0];
          } else if (typeof it === 'string') {
            preset = it;
          }
          if (preset === '@babel/preset-react') {
            presets.push([
              '@babel/preset-react',
              { development: config.get('mode') === 'development' },
            ]);
          } else {
            presets.push(it);
          }
        });
      }
      return {
        ...options,
        presets,
      };
    });

  // config.merge({
  //     externals: {
  //         'react': 'React',
  //         'react-dom': 'ReactDOM'
  //     }
  // });

  // TODO preact
  // config
  //   .resolve
  //   .extensions.add('.jsx').end()
  //   .set('react', 'preact-compat')
  //   .set('react-dom', 'preact-compat')
  //   .end()
  //   .module
  //   .rule(global.__CHIRON_RULE_REACT__)
  //   .test(/\.jsx?$/)
  //   .use(global.__CHIRON_LOADER_BABEL__)
  //   .tap(options => {
  //     const presets: any[] = [];
  //     if (options && Array.isArray(options.presets)) {
  //       options.presets.forEach(it => {
  //         let preset;
  //         if (Array.isArray(it)) {
  //           preset = it[0];
  //         } else if (typeof it === 'string') {
  //           preset = it;
  //         }
  //         if (preset === '@babel/preset-react') {
  //           presets.push(['@babel/preset-react', {
  //             pragma: 'h',
  //             pragmaFrag: 'x-fragment',
  //           }]);
  //         } else {
  //           presets.push(it);
  //         }
  //       });
  //     }
  //     return {
  //       ...options,
  //       presets,
  //     };
  //   });

  // config.merge({
  //     externals: {
  //         'preact': 'preact'
  //     }
  // });
}
