/*
 * @Author: xfz
 */
'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

function resolve(dir) {
  return path.join(__dirname, '/src/', dir);
}

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: '[name].js',
    publicPath: './',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  externals: [nodeExternals()]
};