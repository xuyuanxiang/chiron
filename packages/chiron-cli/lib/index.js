#!/usr/bin/env node
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
const sade_1 = __importDefault(require("sade"));
const run_1 = __importStar(require("./run"));
const package_json_1 = require("../package.json");
require("./autoPatchLog");
const program = sade_1.default('chiron')
    .version(package_json_1.version)
    .option('-d, --debug', 'enable debug info');
program
    .command('start')
    .describe('start chiron app in development mode')
    .action(({ debug }) => {
    if (debug === true) {
        global.__CHIRON_LOG_LEVEL__ = 'debug';
    }
    run_1.default(run_1.Command.START, {
        restart: 3,
        env: { DEBUG: debug },
    });
});
program.parse(process.argv);
