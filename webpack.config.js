const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  entry: {
    'bodymovin-for-wordpress-front' : './bodymovin-for-wordpress.js',
    'bodymovin-for-wordpress-editor' : './editor/bodymovin-for-wordpress.editor.js',
    'bodymovin-for-wordpress-editor-dialog' : './editor/dialog/bodymovin-for-wordpress-dialog.editor.js'
  },
  module: {
    rules: [
    {
       test: /\.html$/,
       loaders: 'file-loader?name=/templates/[name].[ext]?[hash]!extract-loader!html-loader'
     },
     {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.php$/,
        loader: "file-loader?name=[path][name].[ext]"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader?name=[path][name].[ext]"
      }
   ]
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../../plugins/bodymovin-for-wordpress')
  }
};
