process.env.NODE_ENV = "development";

const webpack = require("webpack");
const WebpackServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack/webpack.dev");
const webpackServerConfig = require("./webpack/webpack.server");
const { mfsu } = require("./webpack/utils");

(async () => {
  await mfsu.setWebpackConfig({
    config: webpackDevConfig
  });

  // webpack compiler
  const compiler = webpack(webpackDevConfig);

  // webpack server
  const server = new WebpackServer(webpackServerConfig, compiler);
  await server.start();
})();
