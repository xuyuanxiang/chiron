"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_chain_1 = __importDefault(require("webpack-chain"));
const compile_1 = __importDefault(require("../compiler/compile"));
require("../autoInjectGlobals");
require("../autoPatchLog");
const config = new webpack_chain_1.default();
config
    .context(process.cwd())
    .mode('development');
require('../webpack/common')(config);
require('../webpack/dev')(config);
compile_1.default(config);
