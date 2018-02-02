/**
 * svgo options
 *
 * @flow
 */

export default {
  plugins: [{
    removeAttrs: {
      attrs: 'fill|stroke|class'
    },
    convertShapeToPath: true,
    mergePaths: true,
    removeDimensions: true
  }]
}
