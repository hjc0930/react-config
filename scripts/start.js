"use strict";

process.env.NODE_ENV = "development";

process.on("unhandledRejection", (err) => {
  throw err;
});

const webpack = require("webpack");
const WebpackServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack/webpack.dev");
const devServer = require("./webpack/webpack.devServer");
const { clearConsole } = require("./webpack/utils");

const isInteractive = process.stdout.isTTY;

// webpack compiler
const compiler = webpack(webpackDevConfig);
// webpack server
const server = new WebpackServer(devServer, compiler);

server.startCallback(() => {
  if (isInteractive) {
    clearConsole();
  }
  console.log("Starting the development server...\n");
});

["SIGINT", "SIGTERM"].forEach((sig) => {
  process.on(sig, () => {
    server.close();
    process.exit();
  });
});

process.stdin.on("end", () => {
  server.close();
  process.exit();
});
