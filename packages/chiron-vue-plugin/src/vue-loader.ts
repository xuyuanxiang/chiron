declare module 'vue-loader/lib/plugin' {
  import webpack = require('webpack');

  class VuePlugin extends webpack.Plugin {}

  export = VuePlugin;
}
