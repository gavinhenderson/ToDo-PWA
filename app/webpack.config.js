const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const SW_DEBG = argv.mode === 'development';
  const BASEURL =
    argv.mode === 'development'
      ? 'http://localhost:3000'
      : 'https://todo-pwa-backend.herokuapp.com';

  return {
    entry: {
      bundle: './src/index.js',
      sw: './src/sw/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
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
        __DEBUG__: JSON.stringify(SW_DEBG),
        __BASEURL__: JSON.stringify(BASEURL),
      }),
    ],
  };
};
