module.exports = {
  host: process.env.HOST || "0.0.0.0",
  port: process.env.PORT || 8100,
  hot: true,
  compress: true,
  client: {
    logging: "error",
  },
  historyApiFallback: true,
};
