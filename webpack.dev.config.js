const commonConfig = require("./webpack.common.config");
const merge = require("webpack-merge");
const devConfig = {
  devServer: {
    contentBase:"./dist",
    port:8888,
    hot:true
  },
  devtool:"inline-source-map",
  mode:"development"
};
module.exports = merge(commonConfig,devConfig);