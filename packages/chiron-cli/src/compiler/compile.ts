import Config from 'webpack-chain';
import webpack from 'webpack';
import { EOL } from 'os';
import fail from '../util/fail';

export default function(config: Config) {
  const compiler = webpack(config.toConfig());
  compiler.run((err, stats) => {
    if (err) {
      fail(err.message);
    } else if (stats.hasErrors()) {
      const { errors } = stats.toJson();
      fail(errors.join(EOL));
    }
  });
}
