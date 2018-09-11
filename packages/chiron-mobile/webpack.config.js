const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const convert = require('koa-connect');
const Router = require('koa-router');
const history = require('connect-history-api-fallback');
const { name, version } = require('./package.json');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const outputDir = 'public';
const publicPath = prod ? `https://statics.wosaimg.com/${name}/${version}/` : '/';

module.exports = {
  entry: {
    app: ['./src/main.tsx'],
    polyfill: ['@babel/polyfill'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  externals: {
    'preact': 'preact',
  },
  output: {
    path: path.join(__dirname, outputDir),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        enforce: 'pre',
        include: /node_modules/,
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
                loader: require.resolve('url-loader'),
                options: {
                  limit: prod ? 10240 : 10240000,
                  name: '[name]_[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.less$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            use: [
              prod ? {
                loader: MiniCssExtractPlugin.loader,
                options: {},
              } : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: !prod,
                  localIdentName: prod ? '[name]-[hash:base64:8]' : '[path][name]-[hash:base64:5]',
                  importLoaders: 2,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-preset-env')(),
                    require('postcss-px2rem')({ remUnit: 75 }),
                  ],
                },
              },
              'less-loader',
            ],
          },
          {
            test: /\.tsx?$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            use: 'babel-loader',
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
            loader: require.resolve('file-loader'),
            options: {
              name: '[name]_[hash:8].[ext]',
            },
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
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(!prod), __PUBLIC_PATH__: JSON.stringify(publicPath) }),
    new HtmlWebpackPlugin({
      inject: 'head',
      chunks: ['app'],
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
  ].concat(prod ? [new MiniCssExtractPlugin({
    filename: '[name].css',
  })] : []),
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
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  devtool: prod ? false : 'cheap-module-source-map',
};

if (!prod) {
  const router = new Router();
  router.get('/api/applications', async function() {

  });
  module.exports.serve = {
    add: (app, middleware, options) => {
      app.use(convert(history({

      })));
      middleware.webpack().then(() => {
        middleware.content({
          index: 'index.html',
        });

        app.use(router.routes());
      });
    },
  }
}
