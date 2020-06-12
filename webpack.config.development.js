const path = require('path');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const without = require('lodash/without');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const babelConfig = require('./babel.config');
const buildConfig = require('./build.config');
const pkg = require('./package.json');

dotenv.config({
  path: path.resolve('webpack.config.development.env'),
});

const publicPath = process.env.PUBLIC_PATH || '';
const buildVersion = pkg.version;
const timestamp = new Date().getTime();

module.exports = {
  mode: 'development',
  cache: true,
  target: 'web',
  context: path.resolve(__dirname, 'src/app'),
  devtool: 'cheap-module-eval-source-map',
  entry: {
    polyfill: [
      path.resolve(__dirname, 'src/app/polyfill/index.js'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
    app: [
      path.resolve(__dirname, 'src/app/index.jsx'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'output/portal/app'),
    chunkFilename: `[name].[hash].chunk.js?_=${timestamp}`,
    filename: `[name].[hash].bundle.js?_=${timestamp}`,
    pathinfo: true, // Defaults to false and should not be used in production
    publicPath: publicPath,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          ...babelConfig,
          env: {
            development: {
              plugins: ['react-hot-loader/babel'],
            }
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
              localsConvention: 'camelCase',
            }
          },
          'stylus-loader',
        ],
        exclude: [
          path.resolve(__dirname, 'src/app/styles'),
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              localsConvention: 'camelCase',
            }
          },
          'stylus-loader',
        ],
        include: [
          path.resolve(__dirname, 'src/app/styles'),
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BUILD_VERSION: JSON.stringify(buildVersion),
        LANGUAGES: JSON.stringify(buildConfig.languages),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    // https://github.com/gajus/write-file-webpack-plugin
    // Forces webpack-dev-server to write bundle files to the file system.
    new WriteFileWebpackPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      new RegExp('^\./(' + without(buildConfig.languages, 'en').join('|') + ')$')
    ),
    // Generates a manifest.json file in your root output directory with a mapping of all source file names to their corresponding output file.
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new MiniCssExtractPlugin({
      filename: `[name].css?_=${timestamp}`,
      chunkFilename: `[id].css?_=${timestamp}`,
    }),
    new CSSSplitWebpackPlugin({
      size: 4000,
      imports: '[name].[ext]?[hash]',
      filename: '[name]-[part].[ext]?[hash]',
      preserve: false,
    }),
    new HtmlWebpackPlugin({
      chunks: ['app', 'polyfill'],
      filename: path.resolve(__dirname, 'output/portal/app/index.html'),
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  // https://webpack.github.io/docs/webpack-dev-server.html#additional-configuration-options
  devServer: {
    host: process.env.WEBPACK_DEV_SERVER_HOST,
    disableHostCheck: true,
    noInfo: false,
    lazy: false,
    // // https://webpack.github.io/docs/node.js-api.html#compiler
    watchOptions: {
      // poll: true, // use polling instead of native watchers
      ignored: /node_modules/,
    },
    proxy: {
      '/api': {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
      },
      '/proxy': {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
      },
      '/adfs': {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
      },
      '/login': {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
      },
      '/logout': {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
      },
    },
  },
};
