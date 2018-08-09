const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const prod = mode === 'production';

const outputPath = path.join(__dirname, 'public');

module.exports = {
  entry: './main.js',
  output: {
    path: outputPath,
    publicPath: '/',
  },
  mode,
  devtool: dev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(dev) }),
    new CleanWebpackPlugin(outputPath, {
      verbose: false,
      allowExternal: true,
      root: __dirname,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'index.ejs'),
      favicon: path.join(__dirname, 'favicon.ico'),
      minify: {
        removeComments: prod,
        collapseWhitespace: prod,
        removeRedundantAttributes: prod,
        useShortDoctype: prod,
        removeEmptyAttributes: prod,
        removeStyleLinkTypeAttributes: prod,
        keepClosingSlash: prod,
        minifyJS: prod,
        minifyCSS: prod,
        minifyURLs: prod,
      },
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: dev,
        parallel: true,
        sourceMap: dev,
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
  serve: {
    add: (app, middleware, options) => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };

      app.use(convert(history(historyOptions)));
    },
  },
};
