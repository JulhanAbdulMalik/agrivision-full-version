const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,

    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },

    open: true,
    hot: true,
  },

  plugins: [new MiniCssExtractPlugin()],
});
