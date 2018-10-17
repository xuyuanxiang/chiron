import Config from 'webpack-chain';
import compile from '../compiler/compile';
import '../autoInjectGlobals';
import '../autoPatchLog';

const config = new Config();

config.context(process.cwd()).mode('development');

require('../webpack/common')(config);
require('../webpack/dev')(config);

compile(config);
