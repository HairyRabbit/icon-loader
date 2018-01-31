## Load icon for react app

This lib contain three libs, a loader, a plugin and a component.

### loader

```js
// webpack.config.js

{
  module: {
    rules: [{
      test: /\.svg$/,
      use: {
        loader: '@rabbitcc/icon-loader',
        options: {
          // svgo options
        }
      }
    }]
  }
}

// example.js
import * as React from 'react'
import Svg from './demo.svg'

React.render(<svg />) //=> Render a react component
```

### plugin && component

```js
// webpack.config.js
import IconWebpackPlugin from '@rabbitcc/icon-loader/plugin'

{
  module: {
    // dont forget use icon-loader
  },
  plugins: [
    new IconWebpackPlugin({
      context: path.resolve(__dirname, 'images/icons')
    })
  ]
}


// emample.js
import * as React from 'react'
import Icon from '@rabbitcc/icon-loader/component'

React.render(<Icon name="demo" />) //=> Render demo.svg
```

In production mode, this plugin will generate a svg sprites for you:

```js
// webpack.config.js
import IconWebpackPlugin from '@rabbitcc/icon-loader/plugin'

{
  module: {
    // dont forget use icon-loader
  },
  plugins: [
    new IconWebpackPlugin({
      context: path.resolve(__dirname, 'images/icons'),
    })
  ]
}


// emample.js
import * as React from 'react'
import Icon from '@rabbitcc/icon-loader/component'

React.render(<Icon name="demo" />) //=> Render demo as <use xref:link="icon.svg#demo" >
```

need set `process.env.NODE_ENV` to `production`

### interfaces

interface Icon = {
  name: string,
  size: string,
  color: string
}

interface IconWebpackPlugin = {
  path: string,      // output dir path, inherit webpackOptions.output.path
  context: string,   // which dir can we find svg files, inherit webpackOptions.context
  filename: string   // default to icon.svg
}
