process.env.NODE_ENV = "production";

const webpack = require("webpack");
const webpackProdConfig = require("./webpack/webpack.prod");

// webpack compiler
const compiler = webpack(webpackProdConfig);

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  // const info = stats.toJson();
});
