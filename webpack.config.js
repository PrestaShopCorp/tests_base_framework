const path = require('path');
const webpack = require('webpack');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    main: path.join('src', 'index.ts')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          configFile: 'tsconfig.build.json'
        }
      }
    ]
  },
  externals: [WebpackNodeExternals()],
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        minify: TerserWebpackPlugin.uglifyJsMinify,
        terserOptions: {
          compress: true
        },
        extractComments: false
      })
    ],
    minimize: true
  },
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  target: 'node',
  plugins: [
    new webpack.ProgressPlugin({
      profile: true
    })
  ]
};
