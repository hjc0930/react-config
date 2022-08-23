const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ip = require('ip');
const { utils } = require('./utils');

const PORT = 3000;

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  stats: 'errors-only',
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    hot: true,
    compress: true,
    client: {
      logging: 'error'
    }
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`\r App running at:\n - Local：  ${utils.printColor(`http://localhost:${PORT}`, 'blue')}\n - Network: ${utils.printColor(`http://${ip.address()}:${PORT}`, 'blue')}`
        ],
      },
      clearConsole: true,
    })
  ]
})