'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/**
 * Icon component
 *
 * 
 */
const defaultStyles = {
  width: '24px',
  height: '24px',
  fill: '#232323',
  stroke: '#232323'
};
function Icon(props) {
  // $FlowFixMe
  if (!ICONFILENAME || !ICONCONTEXT) {
    throw new Error(`[Icon] Icon need icon-webpack-plugin.`);
  }

  const {
    name,
    size,
    color
  } = props,
        rest = _objectWithoutProperties(props, ["name", "size", "color"]);

  if (!name) {
    throw new Error('[Icon] name was required.');
  }

  const styles = Object.assign({}, defaultStyles, size ? {
    width: size,
    height: size
  } : {}, color ? {
    fill: color,
    stroke: color
  } : {});

  if (process.env.NODE_ENV === 'production') {
    require(`${ICONCONTEXT}/${name}.svg`);

    return React.createElement("svg", _extends({
      role: "img",
      viewBox: "0 0 1024 1024",
      style: styles
    }, rest), React.createElement("use", {
      xlinkHref: `/${ICONFILENAME}#${name}`
    }));
  } else {
    // $FlowFixMe
    const Component = require(`${ICONCONTEXT}/${name}.svg`).default;

    return React.createElement(Component, _extends({
      style: styles
    }, rest));
  }
}

exports.default = Icon;
