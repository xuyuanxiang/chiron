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
  .command('init [project]')
  .describe('Initialize chiron project')
  .example('init my-awesome-project')
  .action(async (project, { debug }) => {
    if (debug === true) {
      global.__LOG_LEVEL__ = 'debug';
    }
    console.debug('command init, debug=', debug);
    if (typeof project !== 'string' || !project) {
      project = '.';
    }
    // const result = sync('node', [require.resolve('./commands/init'), name],
    //   { stdio: 'inherit' });
    const { init } = await import('./commands/init');
    await init(project);
  });

program
  .command('compile')
  .describe('Compile chiron project')
  .action(async ({ debug }) => {
    if (debug === true) {
      global.__LOG_LEVEL__ = 'debug';
    }
    console.log('debug=', debug);
    const { compile } = await import('./commands/compile');
    try {
      await compile();
    } catch (e) {
      console.error('compile failed:', e.message);
    }
  });
program.parse(process.argv);
