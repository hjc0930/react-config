const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ip = require('ip');

const isDev = process.env.NODE_ENV === 'development';
const PORT = 3000;

module.exports = {
  mode: 'development',
  cache: {
    type: 'filesystem',
  },
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  stats: 'errors-only',
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    index: path.resolve(__dirname, './src/index')
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `js/[name]${isDev ? '' : '-[hash:8]'}.js`,
    clean: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      noParseReact: path.resolve(__dirname, isDev ?
        './node_modules/react/cjs/react.development.js'
        : './node_modules/react/cjs/react.production.js')
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  devServer: {
    host: '0.0.0.0',
    port: PORT,
    hot: true,
  },
  module: {
    noParse: /noParseReact/,
    rules: [
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
              localIdentName: '[local]__[hash:base64:5]'
            }
          }
        }, 'less-loader']
      }
    ]
  },

  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name]-[hash:8].css',
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`\r App running at:\n - Local：  \x1B[34mhttp://localhost:${PORT}\x1B[0m\n - Network: \x1B[34mhttp://${ip.address()}:${PORT}\x1B[0m`
        ],
      },
      clearConsole: true,
    })
  ],

  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       extractComments: false,//不将注释提取到单独的文件中
  //     }),
  //   ],
  // }

}