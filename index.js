const Compiler = require('./Compiler')
const config = require('./serein.config.js')
function SereinBuilder() {
  let compiler = new Compiler(config)
  config.plugin.forEach(plugin => {
    plugin.apply(compiler)
  })
  return compiler
}

const sereinBuilder = SereinBuilder()
sereinBuilder.build()