const { isDev } = require('./dir');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.(j|t)sx?$/i,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  {
    test: /\.css$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
  },
  {
    test: /\.less$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]__[hash:base64:6]'
        }
      }
    }, 'less-loader']
  }
]