const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const PORT = 8083;

module.exports = {
  entry: {
    index: "./src/index.tsx",
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
  plugins: [
    new Dotenv({
      path: "./.env",
      expand: true
    }), 
    new webpack.DefinePlugin({
      'process.env.MODEL_SERVICE_URL': JSON.stringify(process.env.MODEL_SERVICE_URL || 'http://localhost:8080'),
    }),
    new webpack.HotModuleReplacementPlugin(), 
    new HtmlWebpackPlugin({ 
      template: './src/index.html', 
      filename: 'index.html' 
    })
  ]
};
