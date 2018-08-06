const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const outputDir = 'public';

module.exports = {
  entry: {
    app: ['./src/main.js'],
  },
  resolve: {
    extensions: ['.js', '.html'],
  },
  output: {
    path: path.join(__dirname, outputDir),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
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
                  limit: prod ? 10240 : 1024000,
                  name: '[name]_[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.html$/,
            exclude: /node_modules/,
            use: {
              loader: 'svelte-loader',
              options: {
                skipIntroByDefault: true,
                nestedTransitions: true,
                emitCss: true,
                hotReload: true,
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              prod ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  minimize: prod,
                  sourceMap: !prod,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devtool: prod ? false : 'source-map',
  serve: {
    open: true,
    port: 4000,
    content: [path.join(__dirname, outputDir)],
    add: (app, middleware, options) => {
      const historyOptions = {
        verbose: false,
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };

      app.use(convert(history(historyOptions)));
    },
  },
};
