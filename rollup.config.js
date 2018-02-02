import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default [
  ['packages/icon-loader/src/index.js', 'packages/icon-loader/index.js'],
  ['packages/react-icon/src/index.js', 'packages/react-icon/index.js'],
  ['packages/icon-webpack-plugin/src/index.js', 'packages/icon-webpack-plugin/index.js']
].map(([input, output ]) => ({
  input: path.resolve(input),
  output: {
    file: path.resolve(output),
    format: 'cjs',
    exports: 'named'
  },
  plugins: [].concat(
    resolve({
      preferBuiltins: true
    }),
    json({ exclude: 'node_modules/**' }),
    babel({ exclude: 'node_modules/**' }),
    commonjs()
  ),
  external: [].concat(
    'fs',
    'path',
    '@babel/core',
    Object.keys(Object.assign(
      {},
      pkg.dependencies,
      pkg.optionalDependencies,
      pkg.peerDependencies
    ))
  )
}))
