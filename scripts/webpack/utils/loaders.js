const { isDev } = require("./dir");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * @type {import("webpack").ModuleOptions["rules"]}
 */
const config = [
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: "asset",
    generator: {
      filename: "assets/[name]-[contenthash:8][ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 20 * 1024, //超过50kb不转 base64
      },
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    type: "asset",
    generator: {
      // 输出文件位置以及文件名
      filename: "assets/[name][contenthash:8][ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 30 * 1024, // 超过100kb不转 base64
      },
    },
  },
  {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "postcss-loader",
    ],
    sideEffects: true,
  },
  {
    test: /\.less$/i,
    exclude: /\.module\.less$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "postcss-loader",
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
    sideEffects: true,
  },
  {
    test: /\.module\.less$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]__[contenthash:6]",
          },
        },
      },
      "postcss-loader",
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
    sideEffects: true,
  },
  {
    test: /\.s(a|c)ss$/i,
    exclude: /\.module\.s(a|c)ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "postcss-loader",
      "sass-loader",
    ],
    sideEffects: true,
  },
  {
    test: /\.module\.s(a|c)ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]__[contenthash:6]",
          },
        },
      },
      "postcss-loader",
      "sass-loader",
    ],
    sideEffects: true,
  },
];

module.exports = config;
