const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'scripts/[name].[chunkhash:7].js',
    chunkFilename: 'scripts/[name].[chunkhash:7].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.json', '.css', '.scss'],
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      router: path.join(__dirname, 'src/router'),
      components: path.join(__dirname, 'src/components'),
      actions: path.join(__dirname, 'src/store/actions'),
      reducers: path.join(__dirname, 'src/store/reducers'),
      store: path.join(__dirname, 'src/store'),
      styles: path.join(__dirname, 'src/styles'),
      images: path.join(__dirname, 'src/assets/images'),
      utils: path.join(__dirname, 'src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    })
  ]
}
