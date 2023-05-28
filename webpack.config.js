const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const PORT = 8083;
// const pages = ["index", "review", "restaurant-picker"];

module.exports = {
  entry: {
    index: "./src/index.tsx",
    // review: "./src/review.tsx",
    // "restaurant-picker": "./src/restaurant-picker.tsx",
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
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: PORT,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [new Dotenv(), new webpack.HotModuleReplacementPlugin()].concat(
    // pages.map(
    //   (page) =>
    //     new HtmlWebpackPlugin({
    //       hash: true,
    //       title: "App",
    //       myPageHeader: page,
    //       metaDesc: "App",
    //       template: `./src/${page}.html`,
    //       filename: `${page}.html`,
    //       chunks: [page],
    //     })
    // )
    new HtmlWebpackPlugin({
            // hash: true,
            // title: "App",
            // myPageHeader: "index",
            // metaDesc: "App",
            template: './src/index.html',
            filename: 'index.html',
            // chunks: [index],
          })
  ),
};
