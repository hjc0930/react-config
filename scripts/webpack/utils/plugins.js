const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { root } = require('./dir');

module.exports = [
  new HtmlWebpackPlugin({
    template: path.resolve(root, './index.html'),
    filename: 'index.html'
  }),
]