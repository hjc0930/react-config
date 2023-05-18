const { MFSU } = require('@umijs/mfsu');
const path = require('path');
const { nodeModules } = require("./dir");
const webpack = require("webpack");

// [mfsu] 1. init instance
module.exports = new MFSU({
  implementor: webpack,
  buildDepWithESBuild: true,
  tmpBase: path.resolve(nodeModules, '.mfsu'),
});