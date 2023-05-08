const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PORT = 8083;

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "App",
      metaDesc: "App",
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};
