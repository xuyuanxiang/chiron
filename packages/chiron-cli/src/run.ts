import { sync } from 'cross-spawn';

export enum Command {
  START = 'start',
}

export interface RunOptions {
  restart: number | 'always';
  argv?: string[];
  env?: { [key: string]: any };
}

export default function(
  command: Command = Command.START,
  { argv = [], restart = 1, env }: RunOptions = {
    restart: 1,
    argv: [],
  },
) {
  if (restart === 'always') {
    while (true) {
      const { error, stderr, stdout, signal, status } = sync(
        'node',
        [require.resolve(`./command/${command}`)],
        {
          env,
          stdio: 'pipe',
        },
      );
      console.debug('command:', command, 'result: signal=', signal, 'status=', status);
      if (stdout) {
        console.info(stdout);
      }
      if (error || stderr) {
        console.error((error && error.message) || stderr);
        console.warn('restart...');
      } else {
        break;
      }
    }
  } else if (restart) {
    for (let i = 0; i < restart; i++) {
      const { error, signal, status } = sync('node', [require.resolve(`./command/${command}`)], {
        stdio: 'inherit',
      });
      console.debug('command:', command, 'result: signal=', signal, 'status=', status);
      if (error || status !== 0) {
        if (i + 1 === restart) {
          error && console.error(error.message);
        } else {
          console.warn('restart...');
        }
      } else {
        break;
      }
    }
  }
}
