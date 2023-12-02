const { dir } = require("./utils");

/**
 * @type {import("webpack").Configuration["devServer"]}
 */
const devServer = {
  host: "0.0.0.0",
  port: dir.port,
  hot: true,
  compress: true,
  client: {
    logging: "error",
  },
  historyApiFallback: true,
};

module.exports = devServer;
