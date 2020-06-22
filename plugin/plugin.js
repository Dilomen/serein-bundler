class Plugin {
  apply(compiler) {
    compiler.Observer.listen('start', () => {
      console.log("打包开始")
    })
    compiler.Observer.listen('end', () => {
      console.log("打包结束")
    })
  }
}

module.exports = new Plugin()