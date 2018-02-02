/**
 * Icon component
 *
 * @flow
 */

import * as React from 'react'

type Props = {
  name: string,
  size: string,
  color: string
}

const defaultStyles = {
  width: '24px',
  height: '24px',
  fill: '#232323',
  stroke: '#232323'
}

export default function Icon(props: Props): React.Node {
  // $FlowFixMe
  if(!ICONFILENAME || !ICONCONTEXT) {
    throw new Error(`[Icon] Icon need icon-webpack-plugin.`)
  }

  const { name, size, color, ...rest } = props
  if(!name) {
    throw new Error('[Icon] name was required.')
  }

  const styles = {
    ...defaultStyles,
    ...size ? { width: size, height: size } : {},
    ...color ? { fill: color, stroke: color } : {}
  }

  if(process.env.NODE_ENV === 'production') {
    require(`${ICONCONTEXT}/${name}.svg`)
    return (
      <svg
        role="img"
        viewBox="0 0 1024 1024"
        style={styles}
        {...rest}>
        {/* $FlowFixMe */}
        <use xlinkHref={`/${ICONFILENAME}#${name}`} />
      </svg>
    )
  } else {
    // $FlowFixMe
    const Component = require(`${ICONCONTEXT}/${name}.svg`).default
    return (
      <Component style={styles} {...rest} />
    )
  }
}
