const path = require("path");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      "window.jQuery": "jquery",
      jquery: "jquery",
      "window.jquery": "jquery",
      $: "jquery",
      "window.$": "jquery",
    }),
  ],

  entry: {
    main: "./src/js/index.js",
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    alias: {
      "%modules%": path.resolve(__dirname, "src/blocks/modules"),
      "%components%": path.resolve(__dirname, "src/blocks/components"),
    },
  },
};
