const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPLugin = require("mini-css-extract-plugin");
// const webpack = require("webpack");
// const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AsyncChunkNames = require("webpack-async-chunk-names-plugin");
// const WebpackPwaManifest = require("webpack-pwa-manifest");
// const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src", "index.js"),
  },
  mode: "production",
  output: {
    path: path.resolve("dist"),
    filename: "js/[name].[hash].js",
    publicPath: "/",
    chunkFilename: "js/[name].[chunkhash].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPLugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCSSExtractPLugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|ttf|eot|otf|woff)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000,
            name: "[hash].[ext]",
            outputPath: "assets",
          },
        },
      },
    ],
  },
  plugins: [
    new AsyncChunkNames(),
    new MiniCSSExtractPLugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      title: "Vibbe",
      favicon: path.resolve(__dirname, "public/icon.png"),
      hash: true,
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        // vendor chunk
        vendor: {
          // nombre del chunk
          name: "vendor",
          // sincrono + asincronos
          chunks: "all",
          // la ruta del archivo
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          // test: /[\\/]node_modules[\\/]/,
        },

        // common chunk
        common: {
          name: "common",
          minChunks: 2,
          chunks: "async",
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
};
