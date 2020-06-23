const fs = require('fs')
const { toAbsoluteOfBase } = require('../utils/transferPath')
function watchDir(dir, callback) {
  const dirPath = toAbsoluteOfBase(dir)
  try {
    var files = fs.readdirSync(dirPath)
    files.forEach(file => {
      const filePath = `${dirPath}/${file}`
      var stat = fs.statSync(filePath)
      // 如果是文件夹
      if (stat.isDirectory() === true) {
        watchDir(filePath)
      } else {
        fs.watch(filePath, () => {
          callback()
        })
      }
    })
  } catch(err) {
    console.log('Watch Error: ' + err)
  }
  
}
module.exports = watchDir