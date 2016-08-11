/*eslint-disable */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');

const NODE_ENV = process.env.NODE_ENV;

const env = {
  production: NODE_ENV === 'production',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};

module.exports = {
  context: path.join(__dirname, 'src'),


  devtool: env.production ? 'source-map' : 'eval',


  entry: {
    main: env.production ? [
      './index',
    ] : [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './index',
    ],
  },

  stylint: {
    config: './.stylintrc',
  },


  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },


  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx', '.css', '.styl'],
  },


  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssNano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        discardDuplicates: true,
      },
      canPrint: true,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en, ru/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ].concat(env.production ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ] : [
    new webpack.HotModuleReplacementPlugin()]),


  module: {
    preLoaders: [
      {
        test: [/\.js$/, /\.jsx?$/],
        loaders: ['eslint'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.styl$/,
        loader: 'stylint',
        include: path.resolve(__dirname, 'src'),
      },
    ],

    loaders: [
      {
        test: /\.styl$/,
        loader: env.production
          ? ExtractTextPlugin.extract('css-loader!stylus-loader')
          : 'style!css!stylus',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.json$/, loader: 'json',
        include: path.join(__dirname, 'src'),
      },
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};
