const path = require('path');
const merge = require('webpack-merge');
const extractPlugin = require('extract-text-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

const buildConfig = {
  mode: "production",
  devtool: 'inline-source-map',
  module: {
    rules: [
        {
            test: /\.css$/,
            use: extractPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader']
            })
        },
        {
            test: /\.less$/,
            use: extractPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'less-loader']
            })
        },
        {
            test: /\.(scss|sass)$/,
            use: extractPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
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
    new extractPlugin({filename: 'styles/main.css', allChunks: true})
  ]
};

module.exports = merge(baseConfig, buildConfig)
