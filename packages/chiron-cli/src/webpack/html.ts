import HTMLPlugin from 'html-webpack-plugin';
import Config from 'webpack-chain';

export default function(config: Config) {
  config
    .plugin(global.__CHIRON_PLUGIN_HTML__)
    .use(HTMLPlugin, [{ template: './src/document.ejs' }]);
}
