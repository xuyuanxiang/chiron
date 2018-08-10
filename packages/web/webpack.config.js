const path = require('path');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV;
const prod = mode !== 'development';

const outputDir = 'public';

module.exports = {
  mode,
  entry: {
    main: ['./src/main.tsx'],
    polyfill: ['@babel/polyfill'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  output: {
    path: path.join(__dirname, outputDir),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  externals: prod
    ? { preact: 'preact' }
    : {},
  module: {
    strictExportPresence: true,
    rules: (prod ? [] : [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader',
      },
    ]).concat([
      {
        oneOf: [
          {
            test: [
              /\.svg$/,
              /\.bmp$/,
              /\.gif$/,
              /\.jpe?g$/,
              /\.png$/,
              /\.ico$/,
            ],
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: prod ? 10240 : 1024000,
                  name: '[name]_[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            use: 'babel-loader',
          },
        ],
      },
    ]),
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(!prod) }),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'scripts'),
      path.join(__dirname, 'public'),
      /node_modules/,
    ]),
    new CleanWebpackPlugin(path.join(__dirname, outputDir), {
      verbose: false,
      allowExternal: true,
      root: __dirname,
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      chunks: ['main'],
      hash: !prod,
      template: path.join(__dirname, 'src', 'index.ejs'),
      favicon: path.join(__dirname, 'src', 'favicon.ico'),
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
        cache: !prod,
        parallel: true,
        sourceMap: true,
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
  devtool: prod ? false : 'cheap-module-source-map',
  serve: {
    add: (app, middleware, options) => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };

      app.use(convert(history(historyOptions)));
    },
  },
};
