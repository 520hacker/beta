"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval",
  target: "electron",
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "react-hot-loader/patch",
    path.join(__dirname, "app/index.js")
  ],
  externals: {
    "node-hid": "require(\"node-hid\")",
    "ledger-node-js-api": "require(\"ledger-node-js-api\")"
  },
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "bundle.js",
    publicPath: ""
  },
  node: {
    __dirname: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.tpl.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      },
      {
        test: /\.scss$/,
        loader:
          "style-loader!css-loader!sass-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]"
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: "file-loader" },
      {
        test: /\.(?:png|jpg|svg)$/,
        loader: "url-loader",
        query: {
          // Inline images smaller than 10kb as data URIs
          limit: 10000
        }
      },
      {
        test: /node_modules\/JSONStream\/index\.js$/,
        loaders: ["shebang-loader", "babel-loader"]
      },
      {
        test: /node_modules\/rc\/index\.js$/,
        loaders: ["shebang-loader", "babel"]
      }
    ]
  }
};
