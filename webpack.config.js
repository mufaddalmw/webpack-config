const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
  console.log('development: ', env.development); 
  console.log('production: ', env.production);
  return {
    entry: {
      app: './src/index.js'
    },

    mode: env.development ? 'development' : 'production',
    devtool: env.development ? 'source-map' : '',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.scss$/,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
            "css-loader?sourceMap=true", // translates CSS into CommonJS
            "sass-loader?sourceMap=true" // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
          ]
        }
      ]
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vendor'
      }
    },

    resolve: {
      extensions: ['*', '.js']
    },

    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        title: 'Hello Webpack bundled JavaScript Project',
        template: './src/index.html'
      }),

      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "css/[name].css",
        chunkFilename: "css/[id].css"
      })
    ],

    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'js/[name].bundle.js'
    },

    devServer: {
      contentBase: './dist'
    }
  }
};
