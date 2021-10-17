const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: 'local-ipv4',
    static: {
      directory: path.join(__dirname, '../dist/'),
      watch: true,
    },
    open: true,
    compress: true,
    hot: false,
    liveReload: true,

    client: {
      overlay: false,
    },
  },
  target: 'web',

  devtool: 'inline-source-map',
});
