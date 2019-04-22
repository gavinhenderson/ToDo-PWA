const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src/index.js',
    sw: './src/sw.js',
  },
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
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, '../docs/'),
    port: 3000,
    publicPath: 'http://localhost:3000',
  },
  plugins: [
    new webpack.DefinePlugin({
      __TIME__: JSON.stringify(new Date().getTime() / 1000),
    }),
  ],
};
