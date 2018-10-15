const commonConfig = require("./webpack.common.config");
const merge = require("webpack-merge");
const webpackConfig = {
   mode:"production",
   devtool:"cheap-module-source-map"
};
module.exports = merge(commonConfig,webpackConfig);