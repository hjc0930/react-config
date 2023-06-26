import portfinder from "portfinder";
import { Configuration } from "webpack";

import TerminalPrintPlugin from "../TerminalPrintPlugin";
import { outputStaticUrl } from "../constant";
import { chalkINFO } from "../utils/chalkTip";
import { resolveApp } from "../utils/path";

console.log(chalkINFO(`read: ${__filename.slice(__dirname.length + 1)}`));

export default new Promise((resolve) => {
  const defaultPort = 3000;
  portfinder
    .getPortPromise({
      port: defaultPort,
      stopPort: 9000,
    })
    .then((port) => {
      const devConfig: Configuration = {
        target: "web",
        mode: "development",
        stats: "none",
        devtool: "cheap-module-source-map",
        infrastructureLogging: {
          level: "none",
        },
        devServer: {
          client: {
            logging: "none", // https://webpack.js.org/configuration/dev-server/#devserverclient
          },
          hot: true, // 启用 webpack 的热模块替换功能
          // hot: 'only', // 要在构建失败的情况下启用热模块替换而不刷新页面作为后备，请使用hot: 'only'。但在vue项目的话，使用only会导致ts文件没有热更，得使用true
          compress: true, // 为所有服务启用gzip 压缩
          port, // 开发服务器端口，默认8080
          open: false, // 告诉 dev-server 在服务器启动后打开浏览器。
          historyApiFallback: {
            rewrites: [
              /**
               * 如果publicPath设置了/abc，就不能直接设置historyApiFallback: true，这样会重定向到vue3-blog-admin根目录下的index.html
               * publicPath设置了/abc，就重定向到/abc，这样就可以了
               */
              {
                from: new RegExp(outputStaticUrl(false)),
                to: outputStaticUrl(false),
              },
            ],
          },
          /**
           * devServer.static提供静态文件服务器，默认是 'public' 文件夹。static: false禁用
           * 即访问localhost:8080/a.js，其实访问的是public目录的a.js
           */
          // WARN 因为CopyWebpackPlugin插件会复制public的文件，所以static: false后再访问localhost:8080/a.js，其实还是能访问到public目录的a.js
          static: {
            watch: true, // 告诉 dev-server 监听文件。默认启用，文件更改将触发整个页面重新加载。可以通过将 watch 设置为 false 禁用。
            publicPath: outputStaticUrl(false), // 让它和输入的静态目录对应
            directory: resolveApp("./public/"),
          },
        },
        plugins: [
          new TerminalPrintPlugin(),
        ].filter(Boolean),
        optimization: {
          sideEffects: "flag",
        },
      };
      resolve(devConfig);
    })
    .catch((error) => {
      console.log(error);
    });
});
