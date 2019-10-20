const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


if(process.env.NODE_ENV === 'production') {
  module.exports = {
      plugins: [
          require('autoprefixer'),
          require('cssnano'),
          // More postCSS modules here if needed
      ]
  }
}

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader
          }, {
            // Creates `style` nodes from JS strings
            loader: 'style-loader'
          }, {
            loader: 'postcss-loader'
          }, {
            // Translates CSS into CommonJS
            loader: 'css-loader'
          }, {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ],
      }, {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, 
        loader: "file-loader"
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    port: 9000
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    namedModules: true,
    splitChunks: {
       chunks: "all"
    },
    runtimeChunk: true,
    concatenateModules: true
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: (chunk1, chunk2) => {
          let orders = ['corejs', 'zonejs', 'app'];
          return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0]);
      }
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ]
};
