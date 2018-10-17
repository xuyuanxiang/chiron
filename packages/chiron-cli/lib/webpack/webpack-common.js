"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const clean_webpack_plugin_1 = __importDefault(require("clean-webpack-plugin"));
const browserslist = [
    '>= 0.5% in CN',
];
function default_1(config) {
    config
        .resolve.extensions.merge(['.js'])
        .end()
        .end()
        .module
        .rule(global.__CHIRON_RULE_JS__) // babel
        .test(/\.js$/)
        .include.add(global.__CHIRON_DIR_SRC__)
        .end()
        .exclude.add(/node_modules/)
        .end()
        .use(global.__CHIRON_RULE_JS__STAGE_BABEL__)
        .loader(require.resolve('babel-loader'))
        .options({
        cacheDirectory: config.get('mode') === 'development' ? path.join(global.__CHIRON_DIR_DIST__, '.cache') : false,
        babelrc: false,
        preset: [['@babel/preset-env', { targets: browserslist }]],
    })
        .end()
        .end()
        .rule(global.__CHIRON_RULE_LESS__) // less
        .test(/\.less$/)
        .include.add(global.__CHIRON_DIR_SRC__)
        .end()
        .exclude.add(/node_modules/)
        .end()
        .use(global.__CHIRON_RULE_LESS_STAGE_STYLE_LOADER__)
        .loader(config.get('mode') === 'production'
        ? mini_css_extract_plugin_1.default.loader
        : require.resolve('style-loader'))
        .end()
        .use(global.__CHIRON_RULE_LESS_STAGE_CSS_LOADER__)
        .loader(require.resolve('css-loader'))
        .options({
        modules: true,
        importLoaders: 2,
        localIdentName: '[local]-[hash:8]',
        sourceMap: config.get('mode') === 'development',
    })
        .end()
        .use(global.__CHIRON_RULE_LESS_STAGE_POSTCSS_LOADER__)
        .loader(require.resolve('postcss-loader'))
        .options({
        ident: 'postcss',
        sourceMap: config.get('mode') === 'development' ? 'inline' : false,
        plugins: () => [
            require('postcss-preset-env')({ browsers: browserslist }),
        ],
    })
        .end()
        .use(global.__CHIRON_RULE_LESS_STAGE_LESS_LOADER__)
        .loader(require.resolve('less-loader'))
        .options({
        javascriptEnabled: true,
        sourceMap: config.get('mode') === 'development' ? { sourceMapFileInline: true } : null,
    })
        .end()
        .end()
        .end()
        .when(config.get('mode') === 'production', config => config.plugin('css-extract').use(mini_css_extract_plugin_1.default))
        .plugin('clean')
        .use(clean_webpack_plugin_1.default, [[config.output.get('path') || global.__CHIRON_DIR_SRC__], { root: config.get('context') }]);
}
exports.default = default_1;
