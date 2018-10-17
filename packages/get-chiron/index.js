#!/usr/bin/env node
const { execSync } = require('child_process');
const { dirname } = require('path');

try {
  tryYarn();
} catch (e) {
  execSync('npm install -g chiron-cli', {
    stdio: 'inherit',
    encoding: 'utf8',
  });
}

function tryYarn() {
  const bin = execSync('yarn global bin', {
    stdio: 'pipe',
    encoding: 'utf8',
  });
  const prefix = dirname(bin);
  execSync(`yarn global add chiron-cli --prefix ${prefix}`, {
    stdio: 'inherit',
    encoding: 'utf8',
  });
}
