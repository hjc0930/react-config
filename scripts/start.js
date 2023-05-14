process.env.NODE_ENV = "development";

const webpack = require("webpack");
const WebpackServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack/webpack.dev");
const webpackServerConfig = require("./webpack/webpack.server");

// webpack compiler
const compiler = webpack(webpackDevConfig);
// webpack server
const server = new WebpackServer(webpackServerConfig, compiler);

(async () => {
  await server.start();
})();
