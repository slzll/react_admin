const path = require('path');
const extractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js')

const devConfig = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src/index.js'),
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
        use: [{ loader: extractPlugin.loader, options: { hmr: true } }, 'css-loader', 'postcss-loader']
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
          }]
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          {
            loader: extractPlugin.loader,
            options: { hmr: true }
          },
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
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]_[hash:base64:5]'
            }
          }
        }, 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /\.module\.(scss|sass)$/,
        use: [{
          loader: extractPlugin.loader,
          options: { hmr: true }
        }, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new extractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
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
        secure: false,
        onProxyRes(proxyRes, req, res) {
          var cookies = proxyRes.headers['set-cookie'];
          var cookieRegex = /domain=\.jy365\.net/i;
          //修改cookie Path
          if (cookies) {
            var newCookie = cookies.map(function (cookie) {
              console.log(cookieRegex.test(cookie), cookie)
              if (cookieRegex.test(cookie)) {
                return cookie.replace(cookieRegex, 'domain=localhost');
              }
              return cookie;
            });
            //修改cookie path
            delete proxyRes.headers['set-cookie'];
            proxyRes.headers['set-cookie'] = newCookie;
          }
        }
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
