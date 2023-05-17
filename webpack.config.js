const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const Dotenv = require("dotenv-webpack");
const PORT = 8083;
const pages = ['index', 'review'];

module.exports = {
  entry: {
    index: "./src/index.tsx",
    review: "./src/review.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
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
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [new Dotenv(), new webpack.HotModuleReplacementPlugin()].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          hash: true,
          title: "App",
          myPageHeader: page,
          metaDesc: "App",
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          chunks: [page]
        })
    ),
  ),
};
