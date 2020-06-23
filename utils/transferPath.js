const path = require('path');
// 根据根目录的相对地址转化成绝对地址
function toAbsoluteOfBase(resolvePath) {
  return path.resolve(process.cwd(), resolvePath);
}

// 根据当前目录
function toAbsoluteOfDir(__dirname, resolvePath) {
  return path.resolve(__dirname, resolvePath);
}

module.exports = {
  toAbsoluteOfBase,
  toAbsoluteOfDir
}