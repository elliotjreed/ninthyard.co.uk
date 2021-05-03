const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|jpg|png)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./index.html",
      filename: "./index.html",
      minify: {
        removeComments: true,
        removeScriptTypeAttributes: true,
        collapseWhitespace: true,
      },
    }),
    new CopyPlugin({ patterns: [{ from: "./static", to: "./" }] }),
    new WebpackPwaManifest({
      background_color: "#e42312",
      crossorigin: "anonymous",
      description: "Ninth Yard.",
      icons: [
        {
          sizes: [96, 128, 150, 180, 192, 256, 384, 512],
          src: path.resolve("src/images/wide.png"),
        },
      ],
      inject: true,
      ios: true,
      name: "Ninth Yard",
      short_name: "NY",
      theme_color: "#e42312",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
