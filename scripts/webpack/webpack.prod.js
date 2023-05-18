const base = require("./webpack.base");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { EsbuildPlugin } = require("esbuild-loader");

module.exports = merge(base, {
  mode: "production",
  devtool: false,

  stats: {
    assets: true,
    assetsSort: "!size",
    modules: false,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new EsbuildPlugin({
        target: "es2015",
        css: true, // 缩小CSS
        minify: true, // 缩小JS
        minifyWhitespace: true, // 去掉空格
        minifyIdentifiers: true, // 缩短标识符
        minifySyntax: true, // 缩短语法
        legalComments: "none", // 去掉注释
        drop: ["console", "debugger"], // 去除console和debugger
      }),
    ],
  },
  performance: {
    // 设置所有产物体积阈值
    maxAssetSize: 172 * 1024,
    // 设置 entry 产物体积阈值
    maxEntrypointSize: 244 * 1024,
    // 报错方式，支持 `error` | `warning` | false
    hints: "warning",
    // 过滤需要监控的文件类型
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
  ],
});
