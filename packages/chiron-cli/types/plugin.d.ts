declare module 'koa-connect' {
  function convert(middleware: any): void;

  export = convert;
}

declare module 'connect-history-api-fallback' {
  function api(...args: any[]): void;

  export = api;
}

declare module '*-webpack-plugin' {
  import webpack = require('webpack');

  class WebpackPluginImpl extends webpack.Plugin {}

  export = WebpackPluginImpl;
}

declare module 'mini-css-extract-plugin' {
  import webpack = require('webpack');

  class MiniCSSExtractPlugin extends webpack.Plugin {
    static loader: string;
  }

  export = MiniCSSExtractPlugin;
}
