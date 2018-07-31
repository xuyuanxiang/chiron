// const program = require('commander');
// const spawn = require('cross-spawn');
// const fetch = require('node-fetch');
// const pkg = require('../package.json');
// const semver = require('semver');

import { EOL } from 'os';
import sade from 'sade';
import './utils/log-patch';
import { version } from '../package.json';

global.__LOG_LEVEL__ = 'info';

const program = sade('chiron')
  .version(version)
  .option('-d, --debug', 'enable debug info');

program
  .command('init [name]')
  .describe('Initialize chiron app')
  .example('init my-awesome-project')
  .action(async (name, { debug }) => {
    if (debug === true) {
      global.__LOG_LEVEL__ = 'debug';
    }
    console.debug('command init, debug=', debug);
    if (typeof name !== 'string' || !name) {
      name = '.';
    }
    const { init } = await import('./commands/init');
    await init(name);
  });

program.parse(process.argv);
