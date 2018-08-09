// const program = require('commander');
// const spawn = require('cross-spawn');
// const fetch = require('node-fetch');
// const pkg = require('../package.json');
// const semver = require('semver');
import { EOL, cpus } from 'os';
import sade from 'sade';
import { logPatch } from 'chiron-core';
import { version } from '../package.json';

global.__LOG_LEVEL__ = 'info';
logPatch();

const CPU_NUM = cpus().length;

const program = sade('chiron')
  .version(version)
  .option('--worker-threads', 'specific number of worker threads', `${CPU_NUM}`)
  .option('-d, --debug', 'enable debug info.');

program
  .command('init [project]')
  .describe('Initialize chiron project')
  .example('init my-awesome-project')
  .action(async (project, { debug, ['worker-threads']: workerThreads }) => {
    if (debug === true) {
      global.__LOG_LEVEL__ = 'debug';
    }
    console.debug(
      'command init, debug=',
      debug,
      'worker-threads=',
      workerThreads,
    );
    // if (typeof project !== 'string' || !project) {
    //   project = '.';
    // }
    // // const result = sync('node', [require.resolve('./commands/init'), name],
    // //   { stdio: 'inherit' });
    // const { init } = await import('./commands/init');
    // await init(project);
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
