"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const DEBUG = process.env.DEBUG;
const LEVELS = ['debug', 'log', 'info', 'warn', 'error'];
global.__CHIRON_LOG_LEVEL__ = typeof DEBUG !== 'undefined' ? 'debug' : 'info';
function shouldLog(level) {
    return LEVELS.indexOf(level) >= LEVELS.indexOf(global.__CHIRON_LOG_LEVEL__ || 'info');
}
LEVELS.forEach(level => {
    const origin = console[level];
    if (typeof origin === 'function') {
        console[level] = function (...args) {
            if (shouldLog(level)) {
                let color;
                switch (level) {
                    case 'error':
                        color = chalk_1.default.hex('#f4333c');
                        break;
                    case 'warn':
                        color = chalk_1.default.hex('#ffc600');
                        break;
                    case 'info':
                        color = chalk_1.default.bold;
                        break;
                    default:
                        color = chalk_1.default.dim;
                }
                origin.apply(console, [`[${level.toUpperCase()}]`].concat(args).map(arg => color(arg)));
            }
        };
    }
});
