const { VueLoaderPlugin } = require('vue-loader');
const { plugins } = require('../../container/config/webpack.common');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(png, jpe?g|gif|svg|woff|eot|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'vue-style-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [
    ...plugins,
    new VueLoaderPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      }
    }
  }
};
