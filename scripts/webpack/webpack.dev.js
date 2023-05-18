const ip = require("ip");
const esbuild = require("esbuild");
const base = require("./webpack.base");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { esbuildLoader } = require('@umijs/mfsu');
const { utils, mfsu } = require("./utils");


module.exports = merge(base, {
  mode: "development",
  devtool: "cheap-module-source-map",
  stats: "errors-only",

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
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: esbuildLoader,
          options: {
            handler: [
              ...mfsu.getEsbuildLoaderHandler()
            ],
            target: 'esnext',
            jsx: "automatic",
            implementation: esbuild
          }
        }
      }
    ]
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
