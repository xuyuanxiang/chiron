import chalk from 'chalk';

const LEVELS: Array<keyof Console> = ['debug', 'log', 'info', 'warn', 'error'];

function shouldLog(level: keyof Console): boolean {
  return (
    LEVELS.indexOf(level) >= LEVELS.indexOf(global.__LOG_LEVEL__ || 'info')
  );
}

export function logPatch() {
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
              color = chalk.hex('#6abf47');
              break;
            default:
              color = chalk.hex('#888');
          }
          origin.apply(
            console,
            [`[${level.toUpperCase()}] `].concat(args).map(arg => color(arg)),
          );
        }
      };
    }
  });
}
