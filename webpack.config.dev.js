const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const AsyncChunkNames = require("webpack-async-chunk-names-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve("dist"),
    filename: "js/[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    hot: true,
    host: "localhost",
    port: 9000,
    open: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|ttf|eot|otf|woff)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new AsyncChunkNames(),
    new HtmlWebpackPlugin({
      title: "Vibbe",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
