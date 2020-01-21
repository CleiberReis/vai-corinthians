const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const path = require('path');

module.exports = {
    entry: './src/exports.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        contentBase: "./dist",
        port: 9000
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
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader, //Esse plugin conflita com o de baixo! **
                //'style-loader', //adiciona CSS a DOM injetando a tag <style>
                'css-loader', // interpreta os imports, url() ...
                'sass-loader', // carrega os arquivos sass
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    publicPath: 'assets/css',
                  },
                },
              ]
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
      ]
    },
};