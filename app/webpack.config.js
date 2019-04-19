const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const addVersion = (content) =>
  content.toString().replace(/TIME/g, `'${new Date().getTime() / 1000}'`);

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, '../docs/'),
    publicPath: '../docs/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, '../docs/'),
    port: 3000,
    publicPath: 'http://localhost:3000',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      {
        from: 'src/sw.js',
        to: 'sw.js',
        transform(content) {
          return addVersion(content);
        },
      },
    ]),
  ],
};
