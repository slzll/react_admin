const path = require('path');
const merge = require('webpack-merge');
const extractPlugin = require('mini-css-extract-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const buildConfig = {
  mode: "production",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: extractPlugin.loader }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.module\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          { loader: extractPlugin.loader },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }]
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /\.module\.(scss|sass)$/,
        use: [{ loader: extractPlugin.loader }, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new cleanPlugin([
      'dist/{,*/}*.*'
    ], { //匹配删除的文件
      root: __dirname, //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    }),
    new extractPlugin({ filename: '[name].[hash].css', chunkFilename: '[id].[hash].css' })
  ]
};

module.exports = merge(baseConfig, buildConfig)
