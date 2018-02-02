/**
 * pickup used icons
 *
 * @flow
 */

export default function plugin(iconPaths: Set<string>): any {
  return () => {
    let localName
    return {
      visitor: {
        ImportDeclaration(path) {
          if(!/react-icon/.test(path.node.source.value)) {
            return
          }
          path.traverse({
            ImportDefaultSpecifier(path) {
              localName = path.node.local.name
            }
          })
        },
        CallExpression(path) {
          if(!(path.get('callee').isMemberExpression() &&
               'createElement' === path.node.callee.property.name)) {
            return
          }
          const args = path.node.arguments
          if(!(localName === args[0].name &&
               'ObjectExpression' === args[1].type)) {
            return
          }
          const prop = args[1].properties.find(node => 'name' === node.key.name)
          if(!prop) {
            return
          }
          const value = prop.value.value
          iconPaths.add(value)
        }
      }
    }
  }
}


/*
compiler.plugin('emit', (compilation, callback) => {
  const iconPaths = new Set()
  compilation.modules.forEach(module => {
    if(/react-icon/.test(module.request)) {
      console.log(module)
      module.reasons.forEach(reason => {
        const filePath = reason.module.userRequest
        if(filePath) {
          babel(filePath, {
            plugins: [plugin(iconPaths)]
          })
        } else {
          // console.log(reason)
        }
      })
    }
  })
  console.log([...iconPaths])
  callback()
})
*/
