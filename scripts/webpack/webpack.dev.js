const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ip = require("ip");
const { utils, dir } = require("./utils");

module.exports = merge(base, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  stats: "errors-only",

  cache: {
    type: "filesystem",
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          plugins: ["react-refresh/babel"],
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `\r App running at:\n - Local：  ${utils.printColor(
            `http://localhost:${dir.port}`,
            "blue"
          )}\n - Network: ${utils.printColor(
            `http://${ip.address()}:${dir.port}`,
            "blue"
          )}`,
        ],
      },
      clearConsole: true,
    }),
    new ReactRefreshPlugin(),
  ],
});
