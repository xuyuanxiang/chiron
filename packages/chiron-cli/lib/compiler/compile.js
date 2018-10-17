"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const os_1 = require("os");
const fail_1 = __importDefault(require("../util/fail"));
function default_1(config) {
    const compiler = webpack_1.default(config.toConfig());
    compiler.run((err, stats) => {
        if (err) {
            fail_1.default(err.message);
        }
        else if (stats.hasErrors()) {
            const { errors } = stats.toJson();
            fail_1.default(errors.join(os_1.EOL));
        }
    });
}
exports.default = default_1;
