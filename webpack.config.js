const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/exports.js',
  output: {
    filename: 'assets/js/bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    inline: true,
    contentBase: "./dist",
    port: 9000
  },

  module: {
    rules: [{
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader, //Esse plugin conflita com o de baixo! **
          //'style-loader', //adiciona CSS a DOM injetando a tag <style>
          'css-loader', // interpreta os imports, url() ...
          'sass-loader', // carrega os arquivos sass
        ],
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/images'
            },
          },

          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              },
            }
          },
        ],
      },

      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env']
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css'
    }),
    new OptimizeCSSAssetsPlugin({
      //não precisa setar nada nesse caso.
    }),
    new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i
    }),
  ],
};