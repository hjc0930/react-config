const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProgressPlugin } = require("webpack")
const path = require('path');
const { root, isDev } = require('./dir');

module.exports = [
  new HtmlWebpackPlugin({
    template: path.resolve(root, './index.html'),
    filename: 'index.html',
    cache: false,
    minify: isDev ? false : {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true,
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      useShortDoctype: true,
    }
  }),
  new ProgressPlugin(),
]