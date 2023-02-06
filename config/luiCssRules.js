const glob = require('glob');
const path = require('path');
const paths = require('./paths');

const luiCssRules = [
  {
    loader: 'raw-loader',
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: false,
      config: {
        path: './config/postcss.config.js',
      }
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: false,
      includePaths: glob.sync(path.resolve('node_modules/@lui/**')),
    }
  }
]

module.exports = luiCssRules;
