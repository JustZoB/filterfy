const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: [ path.resolve('src', 'scripts', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s?)css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          esModule: false,
          gifsicle: {
            interlaced: true,
          }
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images/' },
        { from: 'src/html', to: '' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: ('style.css')
    }),
  ]
};
