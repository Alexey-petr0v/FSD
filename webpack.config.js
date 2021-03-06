const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    src: path.resolve(__dirname, "src"),
    dist: path.resolve(__dirname, "dist"),
}

module.exports = {
  entry: {
    bundle: PATHS.src + "/index.js"
  },
  output: {
    filename: "[name].js",
    path: PATHS.dist,
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: PATHS.src + '/index.pug',
          filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        template: PATHS.src + '/page.pug',
        filename: 'page.html'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/articles.pug',
      filename: 'articles.html'
  }),
  new HtmlWebpackPlugin({
    template: PATHS.src + '/sell.pug',
    filename: 'sell.html'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, PATHS.dist)
  }
}