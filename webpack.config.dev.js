import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map', 
  noInfo: true, 
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ],
  resolve: {
    root: path.join(__dirname, 'src')
  },  
  target: 'web', 
  output: {
    path: `${__dirname}/src`, 
    publicPath: 'http://localhost:3000/', 
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), 
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({     
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.css$/,  loader: 'style-loader!css-loader!postcss-loader'},
      {test: /\.json$/, loader: 'json' },
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'}
    ]
  }
};
