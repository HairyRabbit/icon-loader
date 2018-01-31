/**
 * webpack plugin
 *
 * @TODO: inject html scripts, https://github.com/jonathantneal/svg4everybody
 *
 * @flow
 */

import fs from 'fs'
import path from 'path'
import Svgo from 'svgo'
import { sync as glob } from 'glob'
import svgstore from 'svgstore'
import { DefinePlugin } from 'webpack'
import { RawSource } from 'webpack-sources'
import { PromiseMap } from '@rabbitcc/promise-extra'
import svgoOptions from './svgoOptions'
import type { Compiler } from 'webpack/lib/Compiler'

type Options = {
  path: string,
  filename: string,
  context: string
}

export default class IconWebpackPlugin {
  path: string;
  filename: string;
  context: string;

  constructor(options: Options) {
    options = options || {}
    this.path = options.path
    this.filename = options.filename || 'icon.svg'
    this.context = options.context
  }

  apply(compiler: Compiler): void {
    const options = compiler.options
    const context = compiler.context

    if(!this.path) {
      this.path = options.output.path
    }

    if(!this.context) {
      this.context = context
    }

    compiler.apply(new DefinePlugin({
      ICONFILENAME: JSON.stringify(this.filename),
      ICONCONTEXT: JSON.stringify(this.context)
    }))

    if(process.env.NODE_ENV === 'production') {
      compiler.plugin('emit', (compilation, callback) => {
        this.make().then(content => {
          compilation.assets[this.filename] = new RawSource(content)
          callback(null, null)
        }).catch(error => {
          callback(error)
        })
      })
    }
  }

  make(): Promise<string> {
    const svgo = new Svgo(svgoOptions)
    return Promise.resolve(glob(this.context + '**/*.svg'))
      .then(iconPaths => PromiseMap(iconPaths.reduce((acc, iconPath) => {
        const name = path.basename(iconPath, path.extname(iconPath))
        const content = fs.readFileSync(iconPath, 'utf-8')
        acc[name] = svgo.optimize(content, { path: iconPath }).then(res => res.data)
        return acc
      }, {})))
      .then(iconMap => {
        return Object.keys(iconMap).reduce((store, name) => {
          return store.add(name, iconMap[name])
        }, svgstore()).toString()
      })
  }
}
