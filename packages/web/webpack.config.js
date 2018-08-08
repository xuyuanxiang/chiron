const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const outputDir = 'public';

module.exports = {
  entry: {
    app: ['./src/main.tsx'],
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
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  externals: prod
    ? {
        preact: 'preact',
        '@wosai/chiron-web-compat': '__CHIRON',
      }
    : {},
  module: {
    strictExportPresence: true,
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader',
      },
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
    ],
  },
  mode,
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, outputDir), {
      verbose: false,
      allowExternal: true,
      root: __dirname,
    }),
    new HtmlWebpackPlugin({
      inject: true,
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
    minimize: false,
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
  devtool: prod ? 'source-map' : 'cheap-module-source-map',
};
