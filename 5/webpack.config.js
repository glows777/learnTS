const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",

  output: {
    path: path.resolve(__dirname, "dist"),

    filename: "bundle.js",
    // 告诉webpack不用箭头函数等一些高级语法
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        // test指定规则生效的文件
        test: /\.ts?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // 设置预定义环境
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["last 2 versions", "safari >= 7"],
                    },
                    // 指定core-js版本
                    corejs: "3",
                    // 使用core-js的方式： usage（按需引入）
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: ["last 2 versions", "safari >= 7"],
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin({
      dist: "./dist",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
