const { isDev } = require("./dir");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  {
    test: /\.tsx$/i,
    exclude: /node_modules/,
    loader: "esbuild-loader",
    options: {
      loader: "tsx",
      target: "es2015",
      jsx: "automatic",
    },
  },
  {
    test: /\.jsx$/i,
    exclude: /node_modules/,
    loader: "esbuild-loader",
    options: {
      loader: "jsx",
      target: "es2015",
      jsx: "automatic",
    },
  },
  {
    test: /\.ts$/i,
    exclude: /node_modules/,
    loader: "esbuild-loader",
    options: {
      loader: "ts",
      target: "es2015",
    },
  },
  {
    test: /\.js$/i,
    exclude: /node_modules/,
    loader: "esbuild-loader",
    options: {
      loader: "js",
      target: "es2015",
    },
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: "asset",
    generator: {
      filename: "assets/[name]-[contenthash:8][ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 50 * 1024, //超过50kb不转 base64
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
        maxSize: 100 * 1024, // 超过100kb不转 base64
      },
    },
  },
  {
    test: /\.css$/i,
    use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
  },
  {
    test: /\.less$/i,
    exclude: /\.module\.less$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "resolve-url-loader",
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.module\.less$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]-[local]__[contenthash:6]",
          },
        },
      },
      "resolve-url-loader",
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.s(a|c)ss$/i,
    exclude: /\.module\.s(a|c)ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "resolve-url-loader",
      "sass-loader",
    ],
  },
  {
    test: /\.module\.s(a|c)ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]-[local]__[contenthash:6]",
          },
        },
      },
      "resolve-url-loader",
      "sass-loader",
    ],
  },
];
