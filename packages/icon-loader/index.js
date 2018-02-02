'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var loaderUtils = _interopDefault(require('loader-utils'));
var reactSvgCore = require('react-svg-core');

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
 * load svg icons
 *
 * Build top on `react-svg-loader`
 *
 * 
 */
function index (content) {
  const cb = this.async();
  const loaderOpts = loaderUtils.getOptions(this) || {};
  const options = Object.assign({}, svgoOptions, loaderOpts);
  Promise.resolve(String(content)).then(reactSvgCore.optimize(options)).then(reactSvgCore.transform({
    jsx: false
  })).then(result => cb(null, result.code)).catch(err => cb(err));
}

exports.default = index;
