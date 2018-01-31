import * as React from 'react'
import ReactDOM from 'react-dom/server'
import Icon from '../../lib/component'

console.log(
  ReactDOM.renderToStaticMarkup(React.createElement(Icon, {
    name: 'demo'
  }))
)
