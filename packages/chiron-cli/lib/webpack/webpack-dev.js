"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const path = __importStar(require("path"));
function default_1(config) {
    config.when(config.get('mode') === 'development', config => {
        config.set('serve', {
            add: (app) => {
                const historyOptions = {
                // ... see: https://github.com/bripkens/connect-history-api-fallback#options
                };
                app.use(convert(connect_history_api_fallback_1.default(historyOptions)));
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
exports.default = default_1;
;
