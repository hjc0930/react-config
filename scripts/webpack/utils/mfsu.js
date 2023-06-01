const { MFSU } = require('@umijs/mfsu');
const path = require('path');
const { nodeModules, isDev } = require("./dir");
const webpack = require("webpack");

// [mfsu] 1. init instance
module.exports = isDev ? new MFSU({
  implementor: webpack,
  buildDepWithESBuild: true,
  tmpBase: path.resolve(nodeModules, '.mfsu'),
}) : null;