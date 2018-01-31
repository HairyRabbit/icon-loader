/**
 * load svg icons
 *
 * @flow
 */

import loaderUtils from "loader-utils"
import { optimize, transform } from "react-svg-core"
import svgoOptions from './svgoOptions'

export default function(content: string) {
  const cb = this.async()
  const loaderOpts = loaderUtils.getOptions(this) || {}
  const options = {
    ...svgoOptions,
    ...loaderOpts
  }

  Promise.resolve(String(content))
    .then(optimize(options))
    .then(transform({ jsx: false }))
    .then(result => cb(null, result.code))
    .catch(err => cb(err))
}
