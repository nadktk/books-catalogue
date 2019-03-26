const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ],
  devtool: "#@cheap-module-eval-source-map",
  devServer: {
    port: 8081,
    contentBase: baseWebpackConfig.externals.paths.dist,
    overlay: {
      warnings: false,
      errors: true
    }
  }
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
