const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const adminHtmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  chunks: ["admin"],
});
const clientHtmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/client.html",
  filename: "./client.html",
  chunks: ["client"],
});
module.exports = {
  entry: {
    admin: "./src/admin.js",
    client: "./src/client.js",
  },
  resolve: {
    alias: {
      "@locales": path.resolve(__dirname, "src/locales"),
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    adminHtmlWebpackPlugin,
    clientHtmlWebpackPlugin,
    new UglifyJsPlugin(),
  ],
};
