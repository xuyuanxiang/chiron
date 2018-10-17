"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(config) {
    config.module
        .rule(global.__CHIRON_RULE_REACT__)
        .test(/\.jsx?$/)
        .use(global.__CHIRON_LOADER_BABEL__)
        .tap(options => (Object.assign({}, options, { presets: [
            ...options.presets,
            ['@babel/preset-react', { development: config.get('mode') === 'development' }],
        ] })));
    // config.merge({
    //     externals: {
    //         'react': 'React',
    //         'react-dom': 'ReactDOM'
    //     }
    // });
    // TODO: preact
    // config.module.rule('preact-compiler')
    //     .test(/\.(react\.js)|(jsx)$/) // 支持*.react.js和*.jsx文件
    //     .use('babel')
    //     .loader('babel-loader')
    //     .tap(options => ({
    //         ...options,
    //         ...babelConfig,
    //         presets: [
    //             ...babelConfig.presets,
    //             ['@babel/preset-react', {
    //                 pragma: 'h',
    //                 pragmaFrag: 'x-fragment'
    //             }]
    //         ]
    //     }));
    // config.resolve.alias
    //     .set('react', 'preact-compat')
    //     .set('react-dom', 'preact-compat');
}
exports.default = default_1;
