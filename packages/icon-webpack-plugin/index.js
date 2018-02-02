'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var Svgo = _interopDefault(require('svgo'));
var glob = require('glob');
var svgstore = _interopDefault(require('svgstore'));
var webpack = require('webpack');
var webpackSources = require('webpack-sources');
var promiseExtra = require('@rabbitcc/promise-extra');

/**
 * svgo options
 *
 * 
 */
var svgoOptions = {
  plugins: [{
    removeAttrs: {
      attrs: 'fill|stroke|class'
    },
    convertShapeToPath: true,
    mergePaths: true,
    removeDimensions: true
  }]
};

/**
 * webpack plugin
 *
 * @TODO: inject html scripts, https://github.com/jonathantneal/svg4everybody
 *
 * 
 */
class IconWebpackPlugin {
  constructor(options) {
    this.path = void 0;
    this.filename = void 0;
    this.context = void 0;
    options = options || {};
    this.path = options.path;
    this.filename = options.filename || 'icon.svg';
    this.context = options.context;
  }

  apply(compiler) {
    const options = compiler.options;
    const context = compiler.context;

    if (!this.path) {
      this.path = options.output.path;
    }

    if (!this.context) {
      this.context = context;
    }

    compiler.apply(new webpack.DefinePlugin({
      ICONFILENAME: JSON.stringify(this.filename),
      ICONCONTEXT: JSON.stringify(this.context)
    }));

    if (process.env.NODE_ENV === 'production') {
      compiler.plugin('emit', (compilation, callback) => {
        this.make().then(content => {
          compilation.assets[this.filename] = new webpackSources.RawSource(content);
          callback(null, null);
        }).catch(error => {
          callback(error);
        });
      });
    }
  }

  make() {
    const svgo = new Svgo(svgoOptions);
    return Promise.resolve(glob.sync(this.context + '**/*.svg')).then(iconPaths => promiseExtra.PromiseMap(iconPaths.reduce((acc, iconPath) => {
      const name = path.basename(iconPath, path.extname(iconPath));
      const content = fs.readFileSync(iconPath, 'utf-8');
      acc[name] = svgo.optimize(content, {
        path: iconPath
      }).then(res => res.data);
      return acc;
    }, {}))).then(iconMap => {
      return Object.keys(iconMap).reduce((store, name) => {
        return store.add(name, iconMap[name]);
      }, svgstore()).toString();
    });
  }

}

exports.default = IconWebpackPlugin;
