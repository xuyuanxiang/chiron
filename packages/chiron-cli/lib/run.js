"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = require("cross-spawn");
var Command;
(function (Command) {
    Command["START"] = "start";
})(Command = exports.Command || (exports.Command = {}));
function default_1(command = Command.START, { argv = [], restart = 1, env } = {
    restart: 1,
    argv: [],
}) {
    if (restart === 'always') {
        while (true) {
            const { error, stderr, stdout, signal, status } = cross_spawn_1.sync('node', [require.resolve(`./commands/${command}`)], {
                env,
                stdio: 'pipe',
            });
            console.debug('command:', command, 'result: signal=', signal, 'status=', status);
            if (stdout) {
                console.info(stdout);
            }
            if (error || stderr) {
                console.error((error && error.message) || stderr);
                console.warn('restart...');
            }
            else {
                break;
            }
        }
    }
    else if (restart) {
        for (let i = 0; i < restart; i++) {
            const { error, signal, status } = cross_spawn_1.sync('node', [require.resolve(`./commands/${command}`)], { stdio: 'inherit' });
            console.debug('command:', command, 'result: signal=', signal, 'status=', status);
            if (error || status !== 0) {
                if (i + 1 === restart) {
                    error && console.error(error.message);
                }
                else {
                    console.warn('restart...');
                }
            }
            else {
                break;
            }
        }
    }
}
exports.default = default_1;
