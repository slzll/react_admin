const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js')

const devConfig = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: [
        "babel-polyfill",
        // "react-hot-loader/patch",  react-hot-loader v4不需要添加
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        /* 这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协 */
        path: path.join(__dirname, './build'),
        filename: '[name].[hash:7].js'
    },
    module: {
        rules: [
            /* react-hot-loader与extract-text-webpack-plugin不兼容，
            所以在开发模式下，不能使用extract-text-webpack-plugin */
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[local]_[hash:base64:5]', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader?modules', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin() //热更新时提示修改的文件名
    ],
    devServer: {
        contentBase: path.join(__dirname, './build'),
        historyApiFallback: true,
        inline: true,
        open: true,
        host: 'localhost',
        port: 8080,
        hot: true,
        proxy: {
            "/api": {
                target: "http://test10.jy365.net",
                changeOrigin: true,
                secure: false
            }
        }
    }
};
module.exports = merge({
    customizeArray(a, b, key) {
        /* entry.app不合并，全替换 */
        if (key === 'entry') {
            return b;
        }
        return undefined;
    }
})(baseConfig, devConfig)