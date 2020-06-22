const Compiler = require('./Compiler')
const config = require('../serein.config.js')
const fs = require('fs')
const path = require('path')
function SereinBuilder() {
  let compiler = new Compiler(config)
  config.plugin.forEach(plugin => {
    plugin.apply(compiler)
  })
  return compiler
}

const sereinBuilder = SereinBuilder()
const filePath = path.resolve(__dirname, '../src/main.js')
if (config.devServer) {
  fs.watch(filePath, () => {
    console.log('打包')
    sereinBuilder.run()
  })
}

// sereinBuilder.build()