const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ip = require("ip");
const { utils } = require("./utils");

module.exports = merge(base, {
  mode: "development",
  devtool: "cheap-module-source-map",
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
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `\r App running at:\n - Local：  ${utils.printColor(
            `http://localhost:${process.env.PORT || 8100}`,
            "blue"
          )}\n - Network: ${utils.printColor(
            `http://${ip.address()}:${process.env.PORT || 8100}`,
            "blue"
          )}`,
        ],
      },
      clearConsole: true,
    }),
    new ReactRefreshPlugin(),
  ],
});
