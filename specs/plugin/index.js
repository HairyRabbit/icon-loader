import * as React from 'react'
import ReactDOM from 'react-dom'
import Test from './foo'
import Icon from '../../packages/react-icon'

ReactDOM.render(React.createElement(Icon, {
  name: 'qq'
}, Test), document.body)
