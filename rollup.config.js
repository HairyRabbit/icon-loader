import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default [
  ['src/index.js', 'lib/index.js'],
  ['src/loader.js', 'lib/loader.js'],
  ['src/component.js', 'lib/component.js'],
  ['src/plugin.js', 'lib/plugin.js']
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
    Object.keys(Object.assign(
      {},
      pkg.dependencies,
      pkg.optionalDependencies,
      pkg.peerDependencies
    ))
  )
}))
