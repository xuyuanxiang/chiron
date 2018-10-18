import Config from 'webpack-chain';
import compile from '../compiler/compile';
import { common, dev, html } from '../webpack';
import '../autoInjectGlobals';
import '../autoPatchLog';

const config = new Config();
config.context(process.cwd()).mode('development');

common(config);
dev(config);
html(config);

compile(config);

console.log('main=', config.entry('main'));
