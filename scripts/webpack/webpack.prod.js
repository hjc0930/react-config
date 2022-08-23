const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,//不将注释提取到单独的文件中
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:8].css',
    }),
  ]
})