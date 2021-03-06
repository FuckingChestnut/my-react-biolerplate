import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import cssnano from 'cssnano'

import getRootPath from './tool/path'

global.styleRoot = getRootPath('src/styles')

export default config => ({
  cache: true,

  debug: true,

  entry: {
    vendor: [
      'animateplus',
      'autobind-decorator',
      'babel-polyfill',
      'classnames',
      'flux-standard-action',
      'history',
      'immutable',
      'joi-browser',
      'lodash',
      'qs',
      'react',
      'react-addons-css-transition-group',
      'react-bootstrap',
      'react-dom',
      'react-intl',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-form',
      'redux-promise',
      'scriptjs',
      'whatwg-fetch'
    ],
    app: [
      getRootPath('src/app.js')
    ]
  },

  output: {
    path: getRootPath('dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  eslint: {
    configFile: './.eslintrc',
    ingore: './.eslintignore'
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=1000'
      },
      {
        // required for bootstrap icons
        test: /\.(woff|woff2)(\?(.*))?$/,
        loader: 'url?prefix=factorynts/&limit=5000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.eot(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.svg(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.otf(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /moxie\-plupload/,
        loader: 'imports?mOxie=moxie!exports?window.plupload'
      }, {
        test: /moxie/i,
        loader: 'exports?this.mOxie'
      }
    ],

    noParse: []
  },

  resolve: {
    alias: {
      node_modules: getRootPath('node_modules'),
      base_modules: getRootPath('base_modules'),
      config: getRootPath('env', config.env),
      moxie: getRootPath('node_modules/Plupload/js/moxie.js'),
      moxiePlupload: getRootPath('node_modules/Plupload/js/plupload.dev.js'),
    },
    extensions: [
      '',
      '.js',
      '.vue',
      '.scss'
    ]
  },

  singleRun: true,

  externals: [],

  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 5 versions']
      },
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ],

  context: __dirname,

  node: {
    __filename: true,
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      __DEBUG__: !config.release
    }),

    new webpack.ProvidePlugin({
      mOxie: 'moxie'
    }),

    // disable dynamic requires
    new webpack.ContextReplacementPlugin(/.*$/, /a^/),

    new ExtractTextPlugin('[name].[hash].css', { allChunks: true }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name]-[hash].js'
    }),

    new HtmlWebpackPlugin({
      filename: './index.html',
      template: getRootPath('src/index.html'),
      inject: true,
      hash: true
    })
  ],

  devtool: 'source-map'
})
