const path = require('path');
const configFile = path.join(process.cwd(), 'chiron.config.js');

const config = require(configFile);

if (config && typeof config.webpack === 'function') {
  config.webpack();
}

console.log(require.resolve('chiron-react-plugin2'));
