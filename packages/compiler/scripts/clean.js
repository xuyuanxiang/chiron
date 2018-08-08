const { resolve } = require('path');
const { del, logPatch } = require('chiron-core');

logPatch();
global.__LOG_LEVEL__ = 'debug';
del(resolve(__dirname, '../lib'));
