import * as React from 'react'
import ReactDOM from 'react-dom'
import Test from './index2'
import Icon from '../../packages/react-icon'

const icon = <Icon name="qq" />

ReactDOM.render(React.createElement(Icon, {
  name: 'qq'
}, Test), document.body)
