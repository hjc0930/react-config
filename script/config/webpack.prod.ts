import CompressionPlugin from "compression-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackTagsPlugin from "html-webpack-tags-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";
import WebpackBar from "webpackbar";

import { gzipEnable } from "../constant";
import { chalkINFO } from "../utils/chalkTip";

console.log(chalkINFO(`read: ${__filename.slice(__dirname.length + 1)}`));

export default new Promise((resolve) => {
  const prodConfig: Configuration = {
    mode: "production",
    devtool: false,
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            chunks: "initial",
            maxSize: 100 * 1024,
            test: /[\\/]node_modules[\\/]/,
            filename: "js/[name]-[contenthash:6]-defaultVendors.js",
            priority: -10,
          },
          default: {
            chunks: "all",
            maxSize: 100 * 1024,
            filename: "js/[name]-[contenthash:6]-default.js",
            priority: -20,
          },
        },
      },
      usedExports: true, // production模式或者不设置usedExports，它默认就是true。usedExports的目的是标注出来哪些函数是没有被使用 unused，会结合Terser进行处理
      sideEffects: true, // webpack.dev.ts有注释
      minimize: true, // 是否开启Terser,默认就是true，设置false后，不会压缩和转化
      minimizer: [
        new TerserPlugin({
          parallel: true, // 使用多进程并发运行以提高构建速度
          extractComments: false, // 去除打包生成的bundle.js.LICENSE.txt
          terserOptions: {
            // Terser 压缩配置
            parse: {
              // default {},如果希望指定其他解析选项，请传递一个对象。
            },
            compress: {
              // default {},传递false表示完全跳过压缩。传递一个对象来指定自定义压缩选项。
              arguments: true, // default: false,尽可能将参数[index]替换为函数参数名
              dead_code: true, // 删除死代码，默认就会删除，实际测试设置false也没用，还是会删除
              toplevel: false, // default: false,在顶级作用域中删除未引用的函数("funcs")和/或变量("vars"), 设置true表示同时删除未引用的函数和变量
              keep_classnames: false, // default: false,传递true以防止压缩器丢弃类名
              keep_fnames: false, // default: false,传递true以防止压缩器丢弃函数名
            },
            /**
             * mangle,默认值true,会将keep_classnames,keep_fnames,toplevel等等mangle options的所有选项设为true。
             * 传递false以跳过篡改名称，或者传递一个对象来指定篡改选项
             */
            mangle: true,
            toplevel: true, // default false,如果希望启用顶级变量和函数名修改,并删除未使用的变量和函数,则设置为true。
            keep_classnames: true, // default: undefined,传递true以防止丢弃或混淆类名。
            keep_fnames: true, // default: false,传递true以防止函数名被丢弃或混淆。
          },
        }),
        new CssMinimizerPlugin({
          parallel: true, // 使用多进程并发执行，提升构建速度。
        }), // css压缩，去除无用的空格等等
      ],
      // runtimeChunk: {
      //   name: 'runtime'
      // }
    },
    plugins: [
      // 构建进度条
      new WebpackBar(),
      // http压缩
      gzipEnable &&
      new CompressionPlugin({
        test: /\.(css|js)$/i,
        threshold: 10 * 1024,
        minRatio: 0.8,
        algorithm: "gzip",
      }),
      new HtmlWebpackTagsPlugin({
        append: false,
        publicPath: "",
        links: [],
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name]-[contenthash:6].css",
        chunkFilename: "css/[id].css",
        ignoreOrder: false,
      }),
    ].filter(Boolean) as any,
  };
  resolve(prodConfig);
});
