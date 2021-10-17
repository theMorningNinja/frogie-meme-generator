const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devServer: {
    host: 'local-ipv4',
    static: {
      directory: path.join(__dirname, '../dist/'),
    },
    open: true,
    compress: true,

    client: {
      overlay: false,
    },
  },
  target: 'web',
});
