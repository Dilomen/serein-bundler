const Compiler = require('./Compiler')
const config = require('../serein.config.js')
const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const debounce = require('../utils/debounce')
const watchDir = require('./watch')
const NODE_ENV = process.env.NODE_ENV
function SereinBuilder() {
  let compiler = new Compiler(config)
  config.plugin.forEach(plugin => {
    plugin.apply(compiler)
  })
  return compiler
}

const sereinBuilder = SereinBuilder()
const filePath = path.resolve(__dirname, '../src/main.js')
if (NODE_ENV === 'production') {
  sereinBuilder.build()
}
if (NODE_ENV === 'development' && config.devServer) {
  const fpath = path.resolve(__dirname, './devServer.js')
  child_process.exec(`node ${fpath}`, (err) => {
    if (err) throw new Error(`Error: ${err}`)
    console.log('http://localhost:8012')
  })
  watchDir('./src', () => {
    debounce(() => {
      sereinBuilder.run()
    }, 500)()
  })
}