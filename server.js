/*eslint-disable */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  stats: { colors: true },
}).listen(8080, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080');
});
