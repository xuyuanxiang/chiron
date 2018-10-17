"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
function default_1(config) {
    config.plugin(global.__CHIRON_PLUGIN_HTML__)
        .use(html_webpack_plugin_1.default, [{ template: './src/document.ejs' }]);
}
exports.default = default_1;
