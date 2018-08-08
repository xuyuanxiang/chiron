const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const __DEV__ = process.env.NODE_ENV === 'development';

const config = {
  context: __dirname,
  devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',
  mode: __DEV__ ? 'development' : 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.umd.js',
    library: {
      root: '__CHIRON',
      amd: '@wosai/chiron-web-compat',
      commonjs: '@wosai/chiron-web-compat',
    },
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    strictExportPresence: true,
    rules: [
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
                  limit: __DEV__ ? 1024000 : 10240,
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
          {
            test: /\.css$/,
            use: [
              __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          {
            test: /\.less$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            use: [
              __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  modules: true,
                  localIdentName: 'chiron__[local]__[hash:base64:8]',
                  minimize: !__DEV__,
                  sourceMap: !__DEV__,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-preset-env')({ stage: 0 }),
                    require('postcss-px2rem')({ remUnit: 75 }),
                  ],
                },
              },
              'less-loader',
            ],
          },
          {
            exclude: [
              /\.([ls])?[ace]ss$/,
              /\.tsx?$/,
              /\.jsx?$/,
              /\.html$/,
              /\.ejs$/,
              /\.json$/,
            ],
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(__DEV__) }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, 'lib'), {
      verbose: false,
      allowExternal: true,
      root: __dirname,
    }),
  ],
  stats: {
    colors: true,
  },
  node: [
    'child_process',
    'cluster',
    'dgram',
    'dns',
    'fs',
    'module',
    'net',
    'readline',
    'repl',
    'tls',
  ].reduce((acc, name) => Object.assign({}, acc, { [name]: 'empty' }), {}),
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: __DEV__,
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
};

module.exports = config;
