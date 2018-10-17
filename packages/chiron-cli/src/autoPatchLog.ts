import chalk from 'chalk';

const DEBUG = process.env.DEBUG;

const LEVELS: Array<keyof Console> = ['debug', 'log', 'info', 'warn', 'error'];

global.__CHIRON_LOG_LEVEL__ = typeof DEBUG !== 'undefined' ? 'debug' : 'info';

function shouldLog(level: keyof Console): boolean {
  return LEVELS.indexOf(level) >= LEVELS.indexOf(global.__CHIRON_LOG_LEVEL__ || 'info');
}

LEVELS.forEach(level => {
  const origin = console[level];
  if (typeof origin === 'function') {
    console[level] = function(...args: string[]) {
      if (shouldLog(level)) {
        let color: ((...text: string[]) => string);
        switch (level) {
          case 'error':
            color = chalk.hex('#f4333c');
            break;
          case 'warn':
            color = chalk.hex('#ffc600');
            break;
          case 'info':
            color = chalk.bold;
            break;
          default:
            color = chalk.dim;
        }
        origin.apply(console, [`[${level.toUpperCase()}]`].concat(args).map(arg => color(arg)));
      }
    };
  }
});
