#!/usr/bin/env node

import sade from 'sade';
import run, { Command } from './run';
import { version } from '../package.json';
import './autoPatchLog';

const program = sade('chiron')
  .version(version)
  .option('-d, --debug', 'enable debug info');

program
  .command('start')
  .describe('start chiron app in development mode')
  .action(({ debug }) => {
    if (debug === true) {
      global.__CHIRON_LOG_LEVEL__ = 'debug';
    }
    run(Command.START, {
      restart: 3,
      env: { DEBUG: debug },
    });
  });

program.parse(process.argv);
