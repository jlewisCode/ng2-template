let webpack = require('webpack');
let NotifierPlugin = require('webpack-notifier');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');

let helpers = require('./config/helpers');


let NODE_ENV = process.env.NODE_ENV || process.env.ENV || 'dev';
if (!NODE_ENV) {
  throw 'NODE_ENV is not set. Try export NODE_ENV="dev"';
}

console.log(`
  ***************  NODE_ENV: ${NODE_ENV}  ***************
`);


let configModule = {
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 9000,
  },

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendors': './src/vendors.ts',
    'main': './src/main.ts'
  },

  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  devtool: 'cheap-module-eval-source-map',

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel?presets[]=es2015'
      // },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file?name=/assets/img/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=/assets/font/[name].[ext]'
      },
      {
        test: /\.s?css$/,
        loader: 'raw!postcss?sourceMap=inline!sass?sourceMap'
      },
    ],
  },

  postcss: [
    autoprefixer({ browsers: 'last 2 versions' })
  ],

  tslint: {
    emitErrors: false, // set emitErrors to true to display errors as errors instead of warnings
    failOnHint: false, // if you want any file with tslint errors to break compilation
  },

  plugins: [
    new NotifierPlugin({alwaysNotify: true}),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendors', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    })
  ]
};


if (NODE_ENV === 'production') {
  let prodConfig = {
    devtool: 'source-map',
    htmlLoader: {
      minimize: false // workaround for ng2
    },
  };

  let prodPlugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        drop_console: true,
        dead_code: true,
        drop_debugger: true,
        unused: true,
      },
    }),
  ];

  Object.assign(configModule, prodConfig);
  configModule.plugins.concat(prodPlugins);
  configModule.postcss.concat( [cssnano({ sourcemap: true })] );
}

module.exports = configModule;
