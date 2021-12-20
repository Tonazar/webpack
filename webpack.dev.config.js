const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin"); // Reduce the bundle file size
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //Extract css files to separate css files
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Clean not required cache files
const HtmlWebpackPlugin = require("html-webpack-plugin"); //Auto generate new html file linked with proper names of js and css

module.exports = {
  //JS bundle

  entry: "./src/index.js",
  output: {
    //[ contenthash ] is used to download to browser cache if there have new changes
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"), //absolute path
    //publicPath: "dist/", old path
    publicPath: "", // new path with html-webpack-plugin
  },
  mode: "development",
  //Development Server
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      //rules for png | jpg
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },

      //rules for css and sass
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // rules for convert modern js to normal js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  //Plugin array
  plugins: [
    // new TerserPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "style.[contenthash].css",
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        // Clean all dist folder and subfolder
        "**/*",
        //path for (Current Working Directory) new folder and subfolder ( build )
        path.join(process.cwd(), "build/**/*"),
      ],
    }),

    //Auto generate new html file linked with proper names of js and css
    new HtmlWebpackPlugin({
      //Custom title for generated html
      title: "New Webpack Title",
      //new file name and subfolder in the dist folder
      //filename: "subfolder/new-file.html",
      //custom meta tag
      // meta: {
      //   description: "Some new template Description",
      // },
      //more custom option in the plugin github
      //new custom html template
      template: "src/index.hbs",
      description: "Some new template Description",
    }),
  ],
};
